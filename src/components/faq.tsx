import { useState } from "react";

const QNA = [
  {
    question: "What is the capital of France?",
    answer: "Paris",
  },
  {
    question: "What is the capital of Spain?",
    answer: "Madrid",
  },
  {
    question: "What is the capital of Germany?",
    answer: "Berlin",
  },
  {
    question: "What is the capital of Italy?",
    answer: "Rome",
  },
  {
    question: "What is the capital of Portugal?",
    answer: "Lisbon",
  },
];

const Section5 = () => {
  const [selected, setSelected] = useState(0);
  const [isFeedback, setIsFeedback] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleSelect = (index: number) => {
    setIsFeedback(false);
    setSelected(index);
    setFeedback(QNA[index].answer);
  };
  return (
    <div className="flex justify-between items-start p-8 bg-red-500 w-full gap-5">
      <div className="w-1/2">
        <h5 className="text-xl">Question</h5>
        {QNA.map((qna, index) => (
          <div
            key={index}
            className={`flex justify-between items-center w-full p-4 rounded-md cursor-pointer ${
              selected === index && !isFeedback ? "bg-red-600 text-white" : "bg-white"
            }`}
            onClick={() => handleSelect(index)}
          >
            <p>{qna.question}</p>
          </div>
        ))}
        <div
          className={`flex justify-between items-center w-full p-4 rounded-md cursor-pointer ${
            isFeedback ? "bg-red-600 text-white" : "bg-white"
          }`}
          onClick={() => {
            setIsFeedback(true);
            setFeedback("");
          }}
        >
          <p className="cursor-pointer">Feedback</p>
        </div>
      </div>
      <div className="w-1/2">
        <h5 className="text-xl">Answer</h5>
        <textarea
          value={isFeedback ? feedback : QNA[selected].answer}
          disabled={!isFeedback}
          className="w-full p-4 rounded-md bg-white"
          rows={10}
          onChange={(e) => setFeedback(e.target.value)}
        />
        {isFeedback && (
          <div className="flex justify-end items-center w-full">
            <button
              className="btn-cancel"
              onClick={() => {
                setIsFeedback(false);
                setFeedback(QNA[selected].answer);
              }}
            >
              Cancel
            </button>
            <button
              className="btn-save"
              onClick={() => {
                QNA[selected].answer = feedback;
                setIsFeedback(false);
              }}
            >
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Section5;
