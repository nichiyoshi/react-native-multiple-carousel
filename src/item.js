import React, {Component} from "react"
import {View, Image} from "react-native"

export default class Item extends Component {
  constructor(props) {
    super(props)
    this.startPositionX = 0
    this.release = false
  }

  render() {
    const {
      source,
      containerStyle,
      imageStyle,
      onPress,
      onSwipeLeft,
      onSwipeRight,
      id
    } = this.props

    return (
      <View
        style={containerStyle}
        onStartShouldSetResponder={evt => {
          this.release = false
          const locationX = evt.nativeEvent.locationX
          console.log(`onStartShouldSetResponder: ${locationX}`)
          this.startPositionX = locationX
          return true
        }}
        onResponderMove={evt => {
          const locationX = evt.nativeEvent.locationX
          console.log(`onResponderMove: ${locationX}`)
          const isSwiping = locationX !== this.startPositionX
          if (!isSwiping) return
          const isSwipingRight = locationX < this.startPositionX
          if (isSwipingRight) {
            console.log("isSwipingRight")
            if (!this.release) {
              console.log("isSwipingRight Actual")
              onSwipeRight()
            }
            this.release = true
          } else {
            console.log("isSwipingLeft")
            if (!this.release) {
              console.log("isSwipingLeft Actual")
              onSwipeLeft()
            }
            this.release = true
          }
        }}
        onResponderRelease={evt => {
          const locationX = evt.nativeEvent.locationX
          console.log(`onResponderRelease:${locationX}`)
          if (locationX === this.startPositionX) {
            onPress(id)
          }
        }}
      >
        <Image source={source} style={imageStyle} />
      </View>
    )
  }
}
