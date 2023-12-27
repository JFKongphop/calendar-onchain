import { DaySelected, DayTime, TimeRatio } from "./type";

export const daySelector: DayTime[] = [
  'AM',
  'PM'
]

export const timeRatioSelector: TimeRatio[] = [
  '00',
  '15',
  '30',
  '45'
];

export const hourTimeSelector = [
  '0', 
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12'
]

export const initialDaySelect: DaySelected = {
  format: (arg0: string) => {},
  $D: 0,
  $H: 0,
  $L: '',
  $M: 0,
  $W: 0,
  $d: '',
  $m: 0,
  $ms: 0,
  $s: 0,
  $u: undefined,
  $x: undefined,
  $y: 0
}

export const defaultValues = {
  title:'',
  startHour: '0',
  endHour: '0'
}