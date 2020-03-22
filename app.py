from flask import Flask
from flask_cors import CORS, cross_origin
from flask import jsonify, request
from flask_sqlalchemy import SQLAlchemy #object relational mapper
import config

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = \
        'mysql://{username}:{password}@{host}:{port}/{database}?charset=utf8&use_unicode=1'.format(
            host=config.DATABASE_HOSTNAME,
            port=config.DATABASE_PORT,
            username=config.DATABASE_USERNAME,
            password=config.DATABASE_PASSWORD,
            database=config.DATABASE_NAME
        )

db = SQLAlchemy(app)
db.create_all()


class Company(db.Model):
    __tablename__ = 'companies'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)

class Department(db.Model):
    __tablename__ = 'departments'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)

    company_id = db.Column(db.ForeignKey('companies.id', ondelete='CASCADE', onupdate='CASCADE'), nullable=False)
    company = db.relationship('Company', backref=db.backref('departments', passive_deletes=True))

class Employee(db.Model):
    __tablename__ = 'employees'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80), unique=True, nullable=False)
    last_name = db.Column(db.String(80), unique=True, nullable=False)

    department_id = db.Column(db.ForeignKey('departments.id', ondelete='CASCADE', onupdate='CASCADE'), nullable=False)
    department = db.relationship('Department', backref=db.backref('employees', passive_deletes=True))



@app.route('/companies')
def get_companies():
    companies = db.session.query(Company).all()
    return jsonify({
        'objects': [{
            'id': company.id,
            'name': company.name,
            'departments': ', '.join([dep.name for dep in company.departments])
        } for company in companies]
    })

#Add Company to Company Table
@app.route('/companies', methods=['POST'])
def add_company():
    name = request.json.get('name')

    if name is None:
        return 400, "Name is required"

    new_company = Company()
    new_company.name = name
    db.session.add(new_company)
    db.session.commit()
    return "ASdfwf", 201

#Delete Single Company from Company table
@app.route('/company/<int:id>', methods=['DELETE'])
def delete_company(id):
    companies = db.session.delete(Company).all()



#Get all departments for given company ID
@app.route('/company/<int:company_id>/departments')
def get_departments(company_id):
    departments = db.session.query(Department).filter(Department.company_id == company_id).all()
    return jsonify({
        'objects': [{
            'id': department.id,
            'name': department.name,
        } for department in departments]
    })


#Get all employees for given department ID
@app.route('/department/<int:department_id>/employees')
def get_employees(department_id):
    employees = db.session.query(Employee).filter(Employee.department_id == department_id).all()
    return jsonify({
        'objects': [{
            'id': employee.id,
            'first_name': employee.name,
            'last_name': employ.name,
        } for employee in employees]
    })


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
