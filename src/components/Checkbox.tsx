import React from 'react';
import { makeStyles } from '@material-ui/styles';

interface IProps {
  label: string;
  name: string;
  checked?: boolean;
  fullWidth?: boolean;
  onChange?: (checked: boolean, name: string) => void;
}

export default function Checkbox(props: IProps) {
  const [checked, setChecked] = React.useState<boolean>(false);
  const { label, name, fullWidth, checked: controlledValue, onChange } = props;
  const c = useStyles({ checked, fullWidth });

  React.useEffect(() => {
    controlledValue !== undefined && setChecked(controlledValue);
  }, [controlledValue]);

  return (
    <label className={c.container}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => {
          setChecked(e.target.checked);
          onChange?.(e.target.checked, name);
        }}
      />
      <div className={c.switch}>
        <span />
      </div>
      <span className={c.label}>{label}</span>
    </label>
  );
}

type StyleProps = Pick<IProps, 'checked' | 'fullWidth'>;

const useStyles = makeStyles((theme) => ({
  container: ({ checked, fullWidth }: StyleProps) => ({
    display: 'inline-flex',
    alignItems: 'center',
    width: fullWidth ? '100%' : 'auto',
    backgroundColor: checked ? theme.palette.secondary.main : '#d3d3d3',
    padding: '7px',
    borderRadius: 4,
    cursor: 'pointer',
    transition: '.1s ease-in',
    '& input': {
      width: 0,
      height: 0,
      opacity: 0,
    },
  }),
  switch: ({ checked }: StyleProps) => ({
    display: 'inline-flex',
    justifyContent: !checked ? 'flex-start' : 'flex-end',
    width: 26,
    height: 16,
    backgroundColor: 'white',
    borderRadius: 4,
    marginRight: '.5rem',
    padding: 1,
    border: checked ? '1px solid white' : '1px solid rgba(0,0,0,.15)',
    transition: '.1s ease-in',
    '& span': {
      width: 12,
      height: 12,
      borderRadius: 3,
      backgroundColor: checked ? theme.palette.secondary.main : '#d3d3d3',
      transition: '.1s ease-in',
    },
  }),
  label: ({ checked }: StyleProps) => ({
    fontSize: '.875rem',
    fontWeight: 500,
    color: checked ? 'white' : theme.palette.text.primary,
  }),
}));
