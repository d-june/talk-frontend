import formatDistanceToNow from "date-fns/formatDistanceToNow";
import ruLocale from "date-fns/locale/ru";
import { FC } from "react";

type TimeProps = {
  date: Date;
};
const Time: FC<TimeProps> = ({ date }) => {
  return (
    <>{formatDistanceToNow(date, { addSuffix: true, locale: ruLocale })}</>
  );
};

export default Time;
