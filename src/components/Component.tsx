import React from "react";
import Button from "./Button";
import { IUserPreference, useUserPreference } from "@/contexts/UserPreferenceContext";

export default function Component() {
  const { data, update } = useUserPreference();

  function clickHandler(value: "sms" | "email" | "push") {
    update({
      notifications: {
        ...data?.notifications,
        [value]: !data?.notifications[value],
      },
    } as IUserPreference);
  }

  return (
    <div className="flex flex-col gap-2 w-64">
      <p className="mb-2">Notifications</p>
      <Button onClick={() => clickHandler("email")}>
        Email: {`${data?.notifications.email}`}
      </Button>
      <Button onClick={() => clickHandler("sms")}>
        SMS: {`${data?.notifications.sms}`}
      </Button>
      <Button onClick={() => clickHandler("push")}>
        Push: {`${data?.notifications.push}`}
      </Button>
    </div>
  );
}
