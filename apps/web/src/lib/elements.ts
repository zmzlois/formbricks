import { Bars3Icon, CheckCircleIcon } from "@heroicons/react/24/outline";

export const elementTypes = [
  {
    type: "open",
    title: "Open Question",
    description: "Let your participants answer in their own words.",
    icon: Bars3Icon,
    color: "pink",
  },
  {
    type: "multipleChoice",
    title: "Multiple Choice",
    description: "Let your participants choose from a set of answers.",
    icon: CheckCircleIcon,
    color: "purple",
  },
  {
    type: "instructions",
    title: "Instructions",
    description: "Give instructions to your users in the beginning or end of your form.",
    icon: CheckCircleIcon,
    color: "green",
  },
];

export const getElementType = (type) => {
  return elementTypes.find((e) => e.type === type);
};
