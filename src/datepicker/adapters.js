// @flow
import {type FieldRenderProps as ReactFinalFormFieldRenderProps} from 'react-final-form';
import type {DatepickerPropsT} from 'baseui/datepicker';
import type {FieldRenderPropsMeta} from '../types';

export type onChangeParamsT = {date: ?Date | Array<Date>};

type AdaptToDatepickerProps = {
  disabled?: boolean,
  meta: FieldRenderPropsMeta,
} & ReactFinalFormFieldRenderProps;
export function adaptToSingleDatepicker(props: {}): DatepickerPropsT {
  const {meta, disabled, input} = ((props: any): AdaptToDatepickerProps);
  return {
    range: false,
    id: input.name,
    disabled,
    value: input.value,
    onChange: ({date}: onChangeParamsT) => {
      if (input.onChange) {
        input.onChange(date);
      }
    },
    error: meta.error && meta.touched,
  };
}

export function adaptToRangeDatepicker(props: {}): DatepickerPropsT {
  const {meta, disabled, input} = ((props: any): AdaptToDatepickerProps);
  return {
    range: true,
    id: input.name,
    disabled,
    value: Array.isArray(input.value) ? input.value : null,
    onChange: ({date}: onChangeParamsT) => {
      if (input.onChange && Array.isArray(date) && date.length > 0) {
        input.onChange(date);
      }
    },
    error: meta.error && meta.touched,
  };
}
