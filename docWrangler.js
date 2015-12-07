
var glob = require('glob');
var fs = require('fs');
var cheerio = require('cheerio');

if(process.argv[2] === 'wrangle-source') {

    wrangleSource();

} else if(process.argv[2] === 'wrangle-html') {

    wrangleHTML();

}

function wrangleSource() {

    glob('lib_docs/**/*.js', function(err, files) {

        files.forEach(function(filename) {

            console.log(filename)

            var src = fs.readFileSync(filename) + '';

            var lines = src.split('\n');

            var foundClass = false;

            lines = lines.map(function(line) {

                if(foundClass)
                    return line;

                if(line.indexOf('class') === 0) {

                    line = line.replace('class', 'export default class')
                    foundClass = true
                }

                if(line.indexOf('require') !== -1) {

                    if(line.indexOf('=') === -1)
                        return line;

                    line = line.split('var').join('')

                    var module = line.split('=')[0].trim()

                    var path = line.split('\'')[1];

                    console.log(module)
                    console.log(path)

                    return 'import ' + module + ' from \'' + path + '\''

                } else {

                    return line
                }

            })

            fs.writeFileSync(filename, lines.join('\n'));
        })

    });
}

function wrangleHTML() {

    glob('docs/**/*.html', function(err, files) {

        files.forEach(function(filename) {

            console.log(filename)

            var src = fs.readFileSync(filename) + '';

            var $ = cheerio.load(src);

            $('.import-path').remove()

            $('[data-ice=extendsChain] span').each(function(i, el) {
                $(el).text($(el).text().split('~')[1])
            })

            $('h4').each(function(i, el) {

                el = $(el);

                if(el.text() === 'Return:')
                    el.text('Returns:');
                else if(el.text() === 'Params:')
                    el.text('Parameters:');
            })

            fs.writeFileSync(filename, $.html())
        })

    })
}

