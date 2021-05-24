import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { useMediaQuery } from 'react-responsive'

const Button = ( { onPress, title } ) => {
  return (
    <TouchableOpacity 
      onPress = { onPress } 
      style = { {
        backgroundColor: "#009688",
        borderRadius: 10,
        height: 50,
        width: 200,
        justifyContent: 'center',
      } }>
      <Text 
        style = { {
          fontSize: 18,
          color: "#fff",
          fontWeight: "bold",
          alignSelf: "center"
        } }
        >{ title }
      </Text>
    </TouchableOpacity>
  )
}

const Layout = ( { portrait, landscape, 
                   pOrientation, lOrientation, 
                   orientation, children } ) => {

  const isPortrait = useMediaQuery( { query: '(orientation: portrait)' } )

  if ( !portrait && !landscape ) {
    return (
      <View 
        style = { {
          flex: 1,
          flexDirection: orientation == 'horizontal' ? 'column' : 'row'
        } }
        >{ children }
      </View>
    )
  } else {
    if ( isPortrait ) {
      return (
        <View 
          style = { {
            flex: 1,
            flexDirection: pOrientation == 'vertical' ? 'column' : 'row'
          } }
          >{ portrait }
        </View>
      )
    } else {
      return (
        <View 
          style = { {
            flex: 1,
            flexDirection: lOrientation == 'horizontal' ? 'row' : 'column'
          } }
          >{ landscape }
        </View>
      )
    } 
  }
}

export const Render = ( object ) => {
  var components = [ ]

	for ( var property in object ) {
    var attributes = { }
    
    for ( var att in object[ property ] ) {
      if ( att[ 0 ] == att[ 0 ].toLowerCase( ) ) {
        attributes[ att ] = object[ property ][ att ]
      } else if ( typeof object[ property ][ att ] === 'function' ) {
        attributes[ att ] = object[ property ][ att ]
      }
    }
    
    if ( attributes.component == 'layout' ) {
      if ( attributes.portrait && attributes.landscape ) {
        components.push(
          <Layout
            key = { property }
            portrait = { Render( attributes.portrait ) }
            landscape = { Render(  attributes.landscape ) }
            pOrientation = { attributes.portrait.orientation }
            lOrientation = { attributes.landscape.orientation }
            >
          </Layout>
        )
      } else {
        components.push(
          <Layout
            key = { property }
            orientation = { attributes.orientation }
            children = { Render( object[ property ] ) }
            >
          </Layout>
        )
      }
    } else if ( attributes.component == 'container' ) {
      components.push(
        <View 
          key = { property }
          style = { attributes }
          >{ Render( object[ property ] ) }
        </View>
      )
    } else if ( attributes.component == 'text' ) {
      components.push(
        <Text 
          key = { property }
          style = { attributes }
          >{ attributes.text }
        </Text>
      )
    } else if ( attributes.component == 'button' ) {
      components.push( 
        <Button 
          key = { property }
          title = { attributes.text } 
          onPress = { attributes.onPress }
        />
      )
    }

	}

  return components
}
