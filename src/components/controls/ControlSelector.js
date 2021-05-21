export default {
  functional: true,
  name: 'ar-control-selector',



  render(createElement, context) {


    // Determin the control type
    const getControlName = (property) => {
      if (property.type === 'string') {

        if (property.contentMediaType) {

          // HTML
          if (property.contentMediaType === 'text/html') return 'ar-tiptap'

          // Image
          else if (property.contentMediaType.startsWith('image/')) return 'ar-image'

          // Javascript, Json
          else if (property.contentMediaType === 'text/javascript' ||
            property.contentMediaType.startsWith('application/')) return 'ar-json'

          // Unknown
          else return [createElement('div', 'Unknown contentMediaType: ' + property.contentMediaType)]

        }

        // Select
        //else if (property.mongoQuery) return 'ar-select'

        // Enumeration
        else if (property.enum) return 'ar-enum'

        // Date time
        else if (property.format === 'date-time') return 'el-date-picker'

        // Text
        else return 'el-input'
      }

      // Number
      else if (property.type === 'number') return 'el-input-number'

      // Integer
      else if (property.type === 'integer') return 'el-input-number'

      // Boolean
      else if (property.type === 'boolean') return 'el-checkbox'

      // Object
      else if (property.type === 'object' && property.properties) return 'ar-nested-object'

      // Array
      else if (property.type === 'array' && property.items) {

        // objects in a subform
        if (property.items.type === 'object' && property.items.properties) return 'ar-object-array'

        // multi select
        else if (property.items.type === 'string') return 'ar-string-array'

      }

      // unknown
      return 'ar-json'
    }

    // Merge property attrs with context.data attrs so that control elements can use them

    // hoist things like placeholder and textarea
    let schemaAttrs = context.data.attrs.property.attrs
    Object.assign(context.data.attrs, schemaAttrs)

    // transmogrify certain attributes
    context.data.props = {}
    let propertyAttrs = context.data.attrs.property

    if (propertyAttrs.type === 'string') {
      // note lowercase l
      if (propertyAttrs.minLength) context.data.attrs.minlength = propertyAttrs.minLength
      if (propertyAttrs.maxLength) context.data.attrs.maxlength = propertyAttrs.maxLength
      if(schemaAttrs && schemaAttrs['show-word-limit']) context.data.props['show-word-limit'] = true
    }


    if (propertyAttrs.type === 'number') {
      if (propertyAttrs.minimum) context.data.props.min = propertyAttrs.minimum
      if (propertyAttrs.maximum) context.data.props.max = propertyAttrs.maximum
      if (propertyAttrs.multipleOf) {
        // use the exponent of multipleOf to determin precision
        propertyAttrs.step = propertyAttrs.multipleOf
        let exp = String(propertyAttrs.multipleOf.toExponential())
        exp = Number(exp.substr(exp.lastIndexOf('e') + 1))
        context.data.props.precision = Math.abs(exp) // must be positive int
      }
      context.data.props['controls-position'] = 'right'
      
    }


    if (propertyAttrs.type === 'integer') {
      if (propertyAttrs.minimum) context.data.props.min = propertyAttrs.minimum
      if (propertyAttrs.maximum) context.data.props.max = propertyAttrs.maximum
      context.data.props.precision = 0
      context.data.props['controls-position'] = 'right'
    }



    return createElement(
      getControlName(context.props.property),
      context.data,
      context.children
    )

  }
}
