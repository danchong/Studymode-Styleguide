# StudyMode Pattern Lab

Using the node.js version of pattern lab:
https://github.com/pattern-lab/patternlab-node

> **Samuel Barclay Beckett** was an Irish avant-garde novelist, playwright, theatre director, and poet, who lived in Paris for most of his adult life.

## Development

_All files (except explicitly ignored files) should pass cscc linting before being committed._

* `npm install` - installs the required npm dependencies
* `grunt serve` - launch the node server which serves your compiled files into your browser
* `grunt watch` - when your repo changes, Pattern Lab files will be re-compiled and automatically reloaded in your browser.

### Adding Dependencies

Add all dependencies into the `devDependencies` object in package.json, *not* in the `dependencies` object. This will ensure that un-necessary modules are not installed when this repo is installed as a dependency on sites likes drive, essays, and answers.

## Conventions
All styles should be written in scss 

#### BEM (Block Element Modifier)
All styles should follow the BEM code style: http://getbem.com/  Do not mix Bootstrap or non-BEM conventions into the styles.
http://mikefowler.me/2013/10/17/support-for-bem-modules-sass-3.3/

#### Font Sizing
All font sizing should follow global em local scoping: https://css-tricks.com/rem-global-em-local/

#### Versioning
```
$ npm version [major | minor | patch]
$ git push --follow-tags
```
See: https://docs.npmjs.com/cli/version

#### Deployment
Must minified asserts to the CDN.  (requires a .aws.json file)

```
$ grunt s3
```
