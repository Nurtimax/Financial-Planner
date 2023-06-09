import { TextField } from '@mui/material';
import { ChangeEvent, FC, FocusEventHandler, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/dispatch';
import { actionPriceSlice } from '../../store/price';

export interface TableCellProps {
  value: number;
  id: string;
  storeId: string;
}

interface newStoreId {
  id?: string;
  value?: number;
}

interface subNewStoreValues {
  id: string;
  value: number;
}

const TableCell: FC<TableCellProps> = ({ id }) => {
  const [value, setValue] = useState(0);
  const { data } = useAppSelector((state) => state.price);

  const dispatch = useAppDispatch();

  const newStoreId: newStoreId = data.reduce((acc, item) => {
    const result = item.months.reduce((subAcc, subItem) => {
      if (id === subItem.id) {
        const newSubValues: subNewStoreValues = {
          ...subAcc,
          id: item.store.name,
          value: subItem.value,
        };
        return newSubValues;
      }
      return subAcc;
    }, {});
    return { ...acc, ...result };
  }, {});

  const handleBlur: FocusEventHandler<HTMLInputElement> = (e) => {
    if (!isNaN(Number(value))) {
      if (newStoreId.id) {
        dispatch(
          actionPriceSlice.changeValue({
            id,
            storeId: newStoreId?.id,
            value,
          })
        );
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
  };

  useEffect(() => {
    if (!isNaN(Number(value))) {
      if (newStoreId.id) {
        dispatch(
          actionPriceSlice.changeValue({
            id,
            storeId: newStoreId?.id,
            value,
          })
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <>
      <TextField
        variant="outlined"
        type="number"
        id="financial-planner"
        value={String(value).replace(/^0+/, '')}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </>
  );
};

export default TableCell;
