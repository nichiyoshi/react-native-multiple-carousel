/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {Component} from "react"
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Button,
  ScrollView,
  TouchableOpacity
} from "react-native"

import Item from "./item"

const NUM_OF_ROW_ITEM = 4

const ICON_WIDTH = 50

const ICON_PADDING = 2

const ICON_WIDTH_WITH_PADDING = ICON_WIDTH + ICON_PADDING * 2

const items = [
  {source: require("./images/1.png"), id: 1},
  {source: require("./images/2.png"), id: 2},
  {source: require("./images/3.png"), id: 3},
  {source: require("./images/4.png"), id: 4},
  {source: require("./images/5.png"), id: 5},
  {source: require("./images/6.png"), id: 6},
  {source: require("./images/7.png"), id: 7},
  {source: require("./images/8.png"), id: 8},
  {source: require("./images/9.png"), id: 9},
  {source: require("./images/10.png"), id: 10}
]

keyExtractor = item => item.id.toString()

renderItem = (item, onPress, onSwipeLeft, onSwipeRight) => (
  <Item
    source={item.source}
    id={item.id}
    containerStyle={styles.imageContainer}
    imageStyle={styles.image}
    index={item.id}
    onPress={onPress}
    onSwipeLeft={onSwipeLeft}
    onSwipeRight={onSwipeRight}
  />
)

export default class App extends Component {
  constructor(props) {
    super(props)
    this.currentIndex = 0
    this.state = {
      pressedItemNumber: 0
    }
  }

  /**
   * 表示するメニューを一番右までずらした時の、左端のメニューのindex
   * このindexのメニューが表示されているときは、これ以上右にずらさないようにする
   * @return {[type]} [description]
   */
  getMaxBeginIndex = () => this.getItemCount() - NUM_OF_ROW_ITEM

  /**
   * メニューの個数
   * @return {[type]} [description]
   */
  getItemCount = () => {
    return items.length
  }

  shiftToRight = () => {
    this.shiftDirection = "right"
    const maxIndex = this.getMaxBeginIndex()
    const currentIndex = this.currentIndex
    const nextIndex = currentIndex < maxIndex ? currentIndex + 1 : maxIndex
    this.flatlist.scrollToIndex({index: nextIndex})
    this.currentIndex = nextIndex
  }

  shiftToLeft = () => {
    this.shiftDirection = "left"
    const currentIndex = this.currentIndex
    const nextIndex = currentIndex > 0 ? currentIndex - 1 : 0
    this.flatlist.scrollToIndex({index: nextIndex})
    this.currentIndex = nextIndex
  }

  skipToRight = () => {
    this.shiftDirection = "right"
    const maxIndex = this.getMaxBeginIndex()
    const currentIndex = this.currentIndex
    const distination = currentIndex + NUM_OF_ROW_ITEM
    const nextIndex = distination > maxIndex ? maxIndex : distination
    this.flatlist.scrollToIndex({index: nextIndex})
    this.currentIndex = nextIndex
  }

  skipToLeft = () => {
    this.shiftDirection = "left"
    const currentIndex = this.currentIndex
    const distination = currentIndex - NUM_OF_ROW_ITEM
    const nextIndex = distination < 0 ? 0 : distination
    this.flatlist.scrollToIndex({index: nextIndex})
    this.currentIndex = nextIndex
  }

  onPressItem = id => {
    this.setState({pressedItemNumber: id})
  }

  render() {
    const {pressedItemNumber} = this.state
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <TouchableOpacity onPress={this.skipToLeft} style={{padding: 20}}>
            <Text>{"<"}</Text>
          </TouchableOpacity>
          <View
            style={{
              borderColor: "black",
              borderWidth: 1,
              borderRadius: 10,
              height: ICON_WIDTH + ICON_PADDING * 2
            }}
          >
            <FlatList
              style={{
                maxWidth: ICON_WIDTH_WITH_PADDING * NUM_OF_ROW_ITEM
              }}
              data={items}
              keyExtractor={keyExtractor}
              renderItem={({item}) =>
                renderItem(
                  item,
                  this.onPressItem,
                  this.shiftToLeft,
                  this.shiftToRight
                )
              }
              horizontal
              ref={o => {
                this.flatlist = o
              }}
              scrollEnabled={false}
            />
          </View>
          <TouchableOpacity onPress={this.skipToRight} style={{padding: 20}}>
            <Text>{">"}</Text>
          </TouchableOpacity>
        </View>
        <Text>
          {pressedItemNumber ? `${pressedItemNumber} was tapped!` : ""}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  imageContainer: {
    padding: ICON_PADDING
  },
  image: {
    width: ICON_WIDTH,
    height: ICON_WIDTH,
    borderRadius: 20
  }
})
