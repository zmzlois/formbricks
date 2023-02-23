import {
  ChatBubbleOvalLeftEllipsisIcon,
  CursorArrowRaysIcon,
  HeartIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";

export const elementTypes = [
  {
    type: "open",
    title: "Open Question",
    description: "Let your participants answer in their own words.",
    icon: ChatBubbleOvalLeftEllipsisIcon,
    color: "blue",
  },
  {
    type: "multipleChoice",
    title: "Multiple Choice",
    description: "Let your participants choose from a set of answers.",
    icon: CursorArrowRaysIcon,
    color: "purple",
  },
  {
    type: "instructions",
    title: "Instructions",
    description: "Give instructions to your users in the beginning or end of your form.",
    icon: QuestionMarkCircleIcon,
    color: "orange",
  },
  {
    type: "thankyou",
    title: "Thank You Page",
    description: "This is the last step of your form.",
    icon: HeartIcon,
    color: "pink",
  },
];

export const getElementType = (type) => {
  return elementTypes.find((e) => e.type === type);
};
