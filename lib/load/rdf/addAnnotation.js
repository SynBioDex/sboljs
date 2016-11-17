
function addAnnotation(identified, predicateNode, objectNode) {

    if(predicateNode.interfaceName !== 'NamedNode') {
        throw new Error('Expected NamedNode for predicate')
    }

    if(objectNode.interfaceName === 'NamedNode') {

        identified.addUriAnnotation(
            predicateNode.toString(), objectNode.toString()
        )
        
    } else {

        identified.addStringAnnotation(
            predicateNode.toString(), objectNode.toString()
        )

    }

}

module.exports = addAnnotation


