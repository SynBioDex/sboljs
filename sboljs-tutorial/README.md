## How to install

First, clone the repository and move into the directory:

```
git clone git@github.com:chrisAta/sboljs-tutorial.git
cd sboljs-tutorial
```

Then, install the dependencies:

```
npm install
npm install -g browserify
```

After that, create the required bundle.js file using browserify:
```
browserify main.js -o bundle.js
```

Finally, you then have to put the tutorial on something like nginx. To do this, install nginx:

`sudo apt install nginx`

You then need to add a server to the nginx sites-enabled. For example, create a new .conf file in '/etc/nginx/sites-enabled/' called tutorial.conf and write:

```
server {

        listen 81;
        root /path/to/sboljs-tutorial;
}
```

And then restart nginx:

```
systemctl restart nginx
```

With the above .conf file, you should then be able to access and use the tutorial at localhost:81/sboljstutorial.html.
