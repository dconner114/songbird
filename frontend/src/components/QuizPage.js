import React from "react";
import QuizForm from "./forms/QuizForm";
import QuizQuestions from "./Quiz/QuizQuestions";
import QuizResults from "./Quiz/QuizResults";
import Alert from '@mui/material/Alert';
import { useState } from "react";

export default function QuizPage(props) {
  const [quizState, setQuizState] = useState("FORM"); // Use "FORM" or "QUESTIONS" or "RESULTS"
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);

  const handleQuizStart = async (formData) => {
    try {
      const response = await fetch('/api/get-questions/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "X-CSRFToken": props.token,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Unknown error');
      } else {
        setError(null);
      }

      const data = await response.json();
      setQuestions(data.questions);
      setQuizState("QUESTIONS");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleQuizSubmit = async (formData) => {
    try {
      const response = await fetch('/api/submit-quiz/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "X-CSRFToken": props.token,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Unknown error');
      } else {
        setError(null);
      }

      const data = await response.json();
      setQuizState("RESULTS");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleReturn = () => {
    setQuizState("FORM");
    setQuestions([]);
  };

  const RenderComponent = () => {
    switch (quizState) {
      case "FORM":
        return <QuizForm onQuizStart={handleQuizStart}/>;
      case "QUESTIONS":
        return <QuizQuestions onQuizSubmit={handleQuizSubmit} questions={questions} />;
      case "RESULTS":
        return <QuizResults onReturn={handleReturn} />;
      default:
        return null;
    }
  }
  return (
    <RenderComponent />
  );
}