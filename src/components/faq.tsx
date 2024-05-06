import { useState } from "react";

const QNA = [
  {
    question: "What kind of time commitment is required to be a mentor?",
    answer: "AlmaTrail offers flexibility. You can choose the level of engagement that suits you, with estimated time commitments outlined. \n\nWe recommend X hours per week for effective mentorship.",
  },
  {
    question: "What qualifications do I need to be a mentor?",
    answer: "You should be a current student (or recent graduate) at a university abroad.\n\nPassion for international education and a willingness to share your knowledge and experiences are key...",
  },
  {
    question: "How do I register to be a mentor on AlmaTrail?",
    answer: "Visit our website and click on the \"Unlock your inner yoda\" button. You'll be directed to a registration form",
  },
  {
    question: "What happens after I register?",
    answer: "Once you register, your application will be reviewed by our team.\n\nIf selected, you'll complete a short onboarding process to familiarize yourself with the platform and best practices for mentoring.",
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
    <div className="bg-[#1d0828]">
      <p className="flex justify-center text-4xl text-white pt-4 font-bold">Frequently Asked Questions</p>
      <div className="flex justify-between p-8 w-full gap-8">

        <div className="w-1/2 flex flex-col gap-2">
          {QNA.map((qna, index) => (
            <div
              key={index}
              className={`lex items-center w-full p-3 rounded-md cursor-pointer ${selected === index && !isFeedback ? "bg-[#654485] text-white border-solid border-2 border-[white]" : "bg-white"
                }`}
              onClick={() => handleSelect(index)}
            >
              <p>{qna.question}</p>
            </div>
          ))}
          <div
            className={`flex justify-between items-center w-full p-4 rounded-md cursor-pointer ${isFeedback ? "bg-[#654485] text-white border-solid border-2 border-[white]" : "bg-white"
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
          <textarea
            value={isFeedback ? feedback : QNA[selected].answer}
            disabled={!isFeedback}
            className="w-full p-4 rounded-md bg-white"
            rows={10}
            onChange={(e) => setFeedback(e.target.value)}
          />
          {isFeedback && (
            <div className="flex justify-start items-center w-full gap-3">
              <button
                className="btn-cancel text-black shadow-md bg-white p-2 rounded-md"
                onClick={() => {
                  setIsFeedback(false);
                  setFeedback(QNA[selected].answer);
                }}
              >
                Cancel
              </button>
              <button
                className="btn-save text-black shadow-md bg-white p-2 rounded-md"
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
    </div>
  );
};

export default Section5;
