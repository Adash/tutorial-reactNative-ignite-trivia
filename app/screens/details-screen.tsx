import React, { FunctionComponent as Component } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TextStyle } from "react-native"
import { Button, Header, Screen, Text, Wallpaper } from "../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../models"
import { spacing, color, typography } from "../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
}
const BOLD: TextStyle = { fontWeight: "bold" }

const HEADER: ViewStyle = {
  alignItems: "center",
}

const HEADER_TEXT: TextStyle = {
  ...BOLD,
  fontSize: 24,
}

const BODY: ViewStyle = {
  padding: 10,
}

const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
  padding: 10,
}

const BUTTON_WRAPPER = {
  marginTop: 20,
  marginBottom: 30,
  width: 200,
}

const BACK_BUTTON: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: "#5D2555",
}

const BACK_BUTTON_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}

export const DetailsScreen: Component = observer(function DetailsScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  const {
    questionStore: { currentQuestion },
  } = useStores()
  const navigation = useNavigation()

  return (
    <Screen style={ROOT} preset="fixed">
      <Wallpaper />
      <View style={HEADER}>
        <Text style={HEADER_TEXT} preset="header" text={currentQuestion.question} />
      </View>
      <View style={BODY}>
        <Text style={BOLD} text="Correct Answer:" />
        <Text text={currentQuestion.correctAnswer} />
        <View>
          <Text text={currentQuestion.question} />
        </View>
        <View style={BUTTON_WRAPPER}>
          <Button
            style={BACK_BUTTON}
            textStyle={BACK_BUTTON_TEXT}
            text="go back"
            onPress={() => {
              navigation.goBack()
            }}
          />
        </View>
      </View>
    </Screen>
  )
})
