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
      else if (property.type === 'number') return 'el-input'

      // Integer
      else if (property.type === 'integer') return 'el-input'

      // Boolean
      else if (property.type === 'boolean') return 'el-checkbox'

      // Object
      else if (property.type === 'object' && property.properties)  return 'ar-nested-object'

      // Array
      else if (property.type === 'array' && property.items) {

        // objects in a subform
        if (property.items.type === 'object' && property.items.properties) return 'ar-object-array'

        // multi select
        else if (property.items.type === 'string')  return 'ar-string-array'

      }

      // unknown
      return 'ar-json'
    }

    //context.data.attrs.type = 'textarea'
    //context.data.attrs.autosize = true

    // Merge property attrs with context.data attrs so that control elements can use them
    let propertyAttrs = context.data.attrs.property.attrs

    let properties = context.data.attrs.property
    let transMutatedObj = {}
    for(let propName in properties) {
      //if(propName === 'minLength') transMutatedObj.minlength = propertyAttrs.minLength
      if(propName === 'maxLength') transMutatedObj.maxlength = properties.maxLength
      if(propName === 'minimum') transMutatedObj.min = properties.minimum
      if(propName === 'maximum') transMutatedObj.max = properties.maximum
      if(propName === 'multipleOf') transMutatedObj.step = properties.multipleOf
    }

    console.log(context.data.attrs.propertyName)
    console.log(transMutatedObj)


    let temp = Object.assign(context.data.attrs, propertyAttrs, transMutatedObj)
    //console.log(temp)


    return createElement(
      getControlName( context.props.property ),
      context.data,
      context.children
    )

  }
}
