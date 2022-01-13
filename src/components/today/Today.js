import Footer from "../footer/Footer";
import Header from "../header/Header";
import { Container, Progress, Habit, CheckBox } from "./todayStyle";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/userContext";
import dayjs from "dayjs";
import checkmark from "../../assets/img/vector.png";
import axios from "axios";
export default function TodayPage() {
  const { user, progress, setProgress } = useContext(UserContext);
  const [habits, sethabits] = useState(null);
  const config = { headers: { Authorization: `Bearer ${user.token}` } };
  const weekDays = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];
  useEffect(() => {
    renderHabits();
  }, []);

  function getTodayHabits(config){
    const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config)
    return promise
}
  function renderHabits() {
    const promise = getTodayHabits(config);
    promise.then((response) => {
      sethabits(response.data);
      setProgress(() => calcProgress(response.data));
    });
  }
  function calcProgress(habitList) {
    let counter = 0;
    for (let i = 0; i < habitList.length; i++) {
      if (habitList[i].done) {
        counter++;
      }
    }
    const percent = ((counter * 100) / habitList.length).toFixed();
    return percent;
  }
  function markHabit(id, done, config){
    if(!done){
    const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`, !done, config)
    return promise
}
    else{
        const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/uncheck`, !done, config)
        return promise
    }
}
  function handleMarkHabit(id, done) {
    const promise = markHabit(id, done, config);
    promise.then(renderHabits);
    promise.catch((error) => alert(error.response.data.message));
  }
  if (habits === null) {
    return <></>;
  }
  return (
    <>
      <Header />
      <Container>
        <p className="title">
          {weekDays[dayjs().day()]},{" "}
          {dayjs().date() < 10 ? `0${dayjs().date()}` : dayjs().date()}/
          {dayjs().month() + 1 < 10
            ? `0${dayjs().month() + 1}`
            : dayjs().month() + 1}
        </p>
        <Progress progress={progress}>
          {progress > 0
            ? `${progress}% dos hábitos concluídos`
            : "Nenhum hábito concluído ainda"}
        </Progress>
      <div className="margin">      
        {habits.map((habit) => {
          return (
            <Habit key={habit.id}>
              <div>
                <p className="habit-name">{habit.name}</p>
                <div className="habit-sequence">
                  <p>
                    Sequência atual:{" "}
                    <span className={habit.done ? "record" : ""}>
                      {habit.currentSequence} dias
                    </span>
                  </p>
                  <p>
                    Seu recorde:{" "}
                    <span
                      className={
                        habit.currentSequence === habit.highestSequence &&
                        habit.done
                          ? "record"
                          : ""
                      }
                    >
                      {habit.highestSequence} dias
                    </span>
                  </p>
                </div>
              </div>
              <CheckBox
                onClick={() => handleMarkHabit(habit.id, habit.done)}
                check={habit.done}
              >
                <img src={checkmark} alt="" />
              </CheckBox>
            </Habit>
          );
        })}
        </div>
      </Container>
      <Footer />
    </>
  );
}