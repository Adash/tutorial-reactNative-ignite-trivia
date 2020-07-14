import React, { useState, useEffect, FunctionComponent as Component } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TextStyle, FlatList, TouchableOpacity, Alert } from "react-native"
// import { useNavigation } from "@react-navigation/native"
import { RadioButtons } from "react-native-radio-buttons"
import { Button, Header, Screen, Text, Wallpaper } from "../components"
import { useStores } from "../models"
import { spacing, color, typography } from "../theme"
import { Question } from "../models/question/question"

const ROOT: ViewStyle = {
  // backgroundColor: "#5D2555",
  flex: 1,
  paddingHorizontal: spacing.large,
}

const HEADER_CONTAINER: ViewStyle = {
  marginTop: spacing.extraLarge,
  marginBottom: spacing.medium,
}

//button styles

const BUTTON_WRAPPER = {
  marginTop: 10,
}

const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
  padding: 10,
}
const BOLD: TextStyle = { fontWeight: "bold" }

const CONTINUE: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: "#5D2555",
}
const CONTINUE_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}

const QUESTION: TextStyle = {
  fontWeight: "bold",
  fontSize: 16,
  marginVertical: spacing.medium,
}

const QUESTION_WRAPPER: ViewStyle = {
  borderBottomColor: color.line,
  borderBottomWidth: 1,
  paddingVertical: spacing.large,
}

const QUESTION_LIST: ViewStyle = {
  marginBottom: spacing.large,
}

const ANSWER: TextStyle = {
  fontSize: 12,
}

const CORRECT_ANSWER: TextStyle = {
  fontSize: 12,
  fontWeight: "bold",
}

const ANSWER_WRAPPER: ViewStyle = {
  paddingVertical: spacing.small,
}

const AnswerCorrectAlert = () => {
  Alert.alert("Correct!", "You're right!", [{ text: "Yay!", onPress: () => console.log("ok") }], {
    cancelable: false,
  })
}

const AnswerIncorrectAlert = () => {
  Alert.alert(
    "Nope",
    "You're wrong this time",
    [{ text: "Buu!", onPress: () => console.log("wrong") }],
    {
      cancelable: false,
    },
  )
}

export const QuestionScreen: Component = observer(function QuestionScreen() {
  const [refreshing, setRefreshing] = useState(true)
  const {
    questionStore: { getQuestions, questions },
  } = useStores()
  // const navigation = useNavigation()

  useEffect(() => {
    fetchQuestions()
  }, [])

  const fetchQuestions = () => {
    setRefreshing(true)
    getQuestions()
    setRefreshing(false)
  }

  const clickAction = () => {
    // fetchQuestions()
    // console.log(currentQuestion)
  }

  const onGuess = (guess, question) => {
    question.setGuess(guess)
  }

  const checkAnswer = item => {
    // console.log("checkin answer : " + item.isCorrect)
    if (item.isCorrect) {
      // Alert.alert("correct")
      AnswerCorrectAlert()
    } else {
      // Alert.alert("wrong")
      AnswerIncorrectAlert()
    }
  }

  const renderAnswer = (answer, selected, onSelect, index) => {
    const style: TextStyle = selected ? { fontWeight: "bold", fontSize: 14, color: "pink" } : {}

    return (
      <TouchableOpacity key={index} style={ANSWER_WRAPPER} onPress={onSelect}>
        <Text text={answer} style={{ ...ANSWER, ...style }} />
      </TouchableOpacity>
    )
  }

  const renderQuestion = ({ item }) => {
    const question: Question = item

    return (
      <View style={QUESTION_WRAPPER}>
        <Text style={QUESTION} text={question.question} />
        <View>
          <RadioButtons
            options={question.allAnswers}
            onSelection={currentQuestion => {
              console.log(currentQuestion)
              onGuess(currentQuestion, question)
            }}
            selectedOption={question.guess}
            renderOption={renderAnswer}
          />
        </View>
        <Button
          style={CONTINUE}
          textStyle={CONTINUE_TEXT}
          text="Check Answer"
          onPress={() => checkAnswer(item)}
        />
      </View>
    )
  }

  return (
    <Screen style={ROOT}>
      <Wallpaper />
      <View style={HEADER_CONTAINER}>
        <Text preset="header" tx="questionScreen.header" />
        <View style={BUTTON_WRAPPER}>
          <Button style={CONTINUE} textStyle={CONTINUE_TEXT} text="fetch" onPress={clickAction} />
        </View>
        <View>
          <FlatList
            style={QUESTION_LIST}
            data={questions}
            renderItem={renderQuestion}
            extraData={{ extraDataForMobX: questions.length > 0 ? questions[0].question : "" }}
            keyExtractor={item => item.id}
            onRefresh={fetchQuestions}
            refreshing={refreshing}
          />
        </View>
      </View>
    </Screen>
  )
})
