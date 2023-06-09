import React, { FC, Fragment, useMemo } from 'react';
import { Box, styled } from '@mui/material';
import { useAppSelector } from '../../hooks/dispatch';
import dayjs from 'dayjs';
import CellDate from './CellDate';

interface ISheduleTableCellProps {
  [key: string]: unknown;
  id: number;
  date: string | Date;
}

const StyledSheduleTableCell = styled(Box)(() => ({
  maxHeight: '62px',
  overflow: 'auto',
}));

const SheduleTableCell: FC<ISheduleTableCellProps> = ({ id, date }) => {
  const { data } = useAppSelector((state) => state.shedule);

  const findData = useMemo(() => {
    return data.find((el) => el.id === id);
  }, [id, data]);

  return (
    <StyledSheduleTableCell>
      {findData ? (
        <>
          {findData.dates.map((findDate) => (
            <>
              {dayjs(findDate.date).date() === dayjs(date).date() ? (
                <CellDate key={findDate.id} {...findDate} userId={id} />
              ) : (
                <Fragment key={findDate.id} />
              )}
            </>
          ))}
        </>
      ) : null}
    </StyledSheduleTableCell>
  );
};

export default SheduleTableCell;
