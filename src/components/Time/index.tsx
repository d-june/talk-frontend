import { FC } from "react";

import formatDistanceToNow from "date-fns/formatDistanceToNow";
import ruLocale from "date-fns/locale/ru";

type TimeProps = {
  date: string;
};
const Time: FC<TimeProps> = ({ date }) => {
  const formatDate = new Date(date);
  return (
    <>
      {formatDistanceToNow(formatDate, { addSuffix: true, locale: ruLocale })}
    </>
  );
};

export default Time;
