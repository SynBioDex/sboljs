

/* Outside of this project, change to:
 *
 *   const SBOLDocument = require('sboljs')
 */
const SBOLDocument = require('../lib/SBOLDocument')

/* prefix string for example purposes
 */
const prefix = 'http://sbolstandard.org/example/'

/* create a new empty SBOL doc
 */
const doc = new SBOLDocument()

/* create component definitions for our promoter, rbs, coding site, and terminator
 */
const promoterDef = doc.componentDefinition(prefix + 'promoter')
const rbsDef = doc.componentDefinition(prefix + 'rbs')
const cdsDef = doc.componentDefinition(prefix + 'cds')
const terminatorDef = doc.componentDefinition(prefix + 'terminator')

/* add relevant role URIs to the component definitions
 */
promoterDef.addRole(SBOLDocument.terms.promoter)
rbsDef.addRole(SBOLDocument.terms.ribosomeBindingSite)
cdsDef.addRole(SBOLDocument.terms.cds)
terminatorDef.addRole(SBOLDocument.terms.terminator)

/* create an example component definition that will contain all of the components
 * we just created.
 */
const componentDefinition = doc.componentDefinition(prefix + 'exampleComponentDefinition')

/* we have component definitions for the various components.  now we need to
 * create components to instantiate them.
 */
const promoter = doc.component(componentDefinition.uri + '/promoter')
const rbs = doc.component(componentDefinition.uri + '/rbs')
const cds = doc.component(componentDefinition.uri + '/cds')
const terminator = doc.component(componentDefinition.uri + '/terminator')

/* hook up our new component instances with their definitions
 */
promoter.definition = promoterDef
rbs.definition = rbsDef
cds.definition = cdsDef
terminator.definition = terminatorDef

/* add them to the example component definition
 */
componentDefinition.addComponent(promoter)
componentDefinition.addComponent(rbs)
componentDefinition.addComponent(cds)
componentDefinition.addComponent(terminator)

/* serialize the newly created document as RDF/XML and print it to the console
 */
console.log(doc.serializeXML())


