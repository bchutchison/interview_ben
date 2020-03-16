FROM phusion/baseimage:0.10.1
# Use baseimage-docker's init system.
CMD ["/sbin/my_init"]

# Install NODE
RUN apt-get install --yes curl
RUN curl --silent --location https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get install --yes nodejs
RUN npm install -g karma-cli gulp

# General installs
RUN apt-get update -y
RUN apt-get -y install python-mysqldb build-essential python-dev libmysqlclient-dev libffi-dev python-pip alembic wkhtmltopdf openssl xorg libssl-dev xvfb libxml2-dev phantomjs

# Install tex packages
RUN apt-get install -y xzdec tex-common tex-gyre texinfo texlive texlive-base texlive-binaries texlive-extra-utils texlive-font-utils texlive-fonts-recommended texlive-fonts-recommended-doc texlive-generic-recommended texlive-latex-base texlive-latex-base-doc texlive-latex-extra texlive-latex-recommended texlive-latex-recommended-doc texlive-pictures texlive-pictures-doc texlive-pstricks texlive-pstricks-doc texlive-fonts-extra texlive-bibtex-extra biber

# Clean up APT when done.
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

COPY requirements.txt /app/
WORKDIR /app

EXPOSE 5000

RUN python -m pip install --upgrade pip setuptools wheel
RUN pip install -r requirements.txt