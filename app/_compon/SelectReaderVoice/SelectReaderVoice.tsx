import { InitParamsReader, ReaderProps } from '@/types/reader';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

interface SelectReaderVoiceProps {
  reader?: ReaderProps;
  paramsReader: InitParamsReader;
  handleChangeSelect: (event: SelectChangeEvent) => void;
}

const SelectReaderVoice = ({
  reader,
  paramsReader,
  handleChangeSelect,
}: SelectReaderVoiceProps) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {reader && (
        <FormControl>
          <InputLabel id="select-reader">Голос</InputLabel>
          <Select
            name="select-reader"
            value={paramsReader.language}
            label="voice"
            onChange={handleChangeSelect}
          >
            {reader.voices?.map((elem, index) => {
              return (
                <MenuItem key={index} value={elem.name}>
                  {elem.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      )}
    </Box>
  );
};

export default SelectReaderVoice;
