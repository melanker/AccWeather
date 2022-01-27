import {Paper, styled} from "@mui/material";

export const Container = styled('div')`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  padding: 30px 0;

`
export const MuiPaper = styled(Paper)`
  padding: 20px;
  display: flex;
  flex: 1;
  width: calc(100% - 200px);
  flex-direction: column;
  align-items: center;
`

export const TitleRow = styled('div')`
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
`
