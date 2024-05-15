import { useState } from "react";

import { PaperPlaneIcon } from "@radix-ui/react-icons";

const QNA = [
  {
    question: "What kind of time commitment is required to be a peer?",
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

const FaqSection = () => {
  const [selected, setSelected] = useState(0);
  const [isFeedback, setIsFeedback] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleSelect = (index: number) => {
    setIsFeedback(false);
    setSelected(index);
    setFeedback(QNA[index].answer);
  };
  return (
    <div className="bg-[#1d0828] flex justify-center items-center pb-16">
      <div className="rounded-2xl p-4 w-11/12 bg-white">
        <p className="flex justify-center text-4xl text-[#1d0828] pt-4 font-bold">Frequently Asked Questions</p>
        <div className="flex justify-center p-8 w-full gap-8">
          <div className="w-full flex flex-col gap-2">
            {QNA.map((qna, index) => (
              <div
                key={index}
                className={`flex items-center w-full p-3 rounded-2xl cursor-pointer border-solid border-2 border-[#1d0828] ${selected === index && !isFeedback ? "bg-[#281742] text-white" : "bg-white"
                  }`}
                onClick={() => handleSelect(index)}
              >
                <p>{qna.question}</p>
                <div className="flex-grow">
                  <div className="w-3 h-3 rounded-3xl bg-white ml-auto"></div>
                </div>
              </div>
            ))}
            <div
              className={`flex justify-between items-center w-full p-3 rounded-2xl cursor-pointer border-solid border-2 border-[#1d0828] ${isFeedback ? "bg-[#281742] text-white border-solid border-2 border-[white]" : "bg-white"
                }`}
              onClick={() => {
                setIsFeedback(true);
                setFeedback("");
              }}
            >
              <p className="cursor-pointer">Feedback</p>
              <div className="flex-grow">
                <div className="w-3 h-3 rounded-3xl bg-white ml-auto"></div>
              </div>
            </div>
          </div>
          <div className="w-2/3">
            <div className="flex flex-col border-2 border-white bg-[#281742] p-4 rounded-xl">
            <div className="w-3 h-3 rounded-3xl bg-white"></div>
              <textarea
                value={isFeedback ? feedback : QNA[selected].answer}
                disabled={!isFeedback}
                className={`w-full mt-3 ${isFeedback ? 'bg-white rounded-xl text-[#1d0828] p-1' : 'bg-transparent text-white'}`}
                rows={10}
                onChange={(e) => setFeedback(e.target.value)}
              />
              {isFeedback && (
                <div className="flex justify-start items-center w-full gap-3 pt-2">
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
                    className="btn-save text-black shadow-md bg-white p-3 ml-auto rounded-md"
                    onClick={() => {
                      QNA[selected].answer = feedback;
                      setIsFeedback(false);
                    }}
                  >
                    <PaperPlaneIcon/>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
