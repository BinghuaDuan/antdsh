const OWL_CONST = {
  CONTEXT: {
    "label": {
      "@id": "http://www.w3.org/2000/01/rdf-schema#label"
    },
    "subClassOf": {
      "@id": "http://www.w3.org/2000/01/rdf-schema#subClassOf",
      "@type": "@id"
    },
    "domain": {
      "@id": "http://www.w3.org/2000/01/rdf-schema#domain",
      "@type": "@id"
    },
    "range": {
      "@id": "http://www.w3.org/2000/01/rdf-schema#range",
      "@type": "@id"
    },
    "owl": "http://www.w3.org/2002/07/owl#",
    "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
    "xsd": "http://www.w3.org/2001/XMLSchema#",
    "rdfs": "http://www.w3.org/2000/01/rdf-schema#"
  },
  KEYS: {
    GRAPH: '@graph',
    CONTEXT: '@context',
    ID: '@id',
    TYPE: '@type',
    LABEL: 'label',
    SUB_CLASS_OF: 'subClassOf',
    DOMAIN: 'domain',
    RANGE: 'range',
    DATATYPE_PROPERTY: 'DatatypeProperty',
    OBJECT_PROPERTY: 'ObjectProperty',
  },
  TYPE: {
    CLASS: 'owl:Class',
    DATATYPE_PROPERTY: 'owl:DatatypeProperty',
    OBJECT_PROPERTY: 'owl:ObjectProperty',
  },
  RANGE: {
    BUILT_IN_DATATYPE: {
      STRING: 'xsd:string',
      INTEGER: 'xsd:integer',
      DOUBLE: 'xsd:double',
      BOOLEAN: 'xsd:boolean',
    }
  }
};

export default OWL_CONST;