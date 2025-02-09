import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";

interface HelpProps {
  name: string;
  messagesClassName?: string;
  messageClassName?: string;
}

export function Messages({ messagesClassName, messageClassName, name }: HelpProps) {
  const {
    formState: { errors },
  } = useFormContext();
  return (
    <ErrorMessage
      errors={errors}
      name={name}
      render={({ messages }) =>
        messages &&
        Object.entries(messages).map(([type, message]) => (
          <ul className={messagesClassName || "formbricks-messages"}>
            <li
              className={messageClassName || "formbricks-message"}
              id={`${name}-${type}`}
              data-message-type={type}
              role="alert">
              {message}
            </li>
          </ul>
        ))
      }
    />
  );
}
