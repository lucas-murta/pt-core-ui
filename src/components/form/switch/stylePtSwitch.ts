import type { PtSwitchProps } from './PtSwitch.interface';

export const buildSwitchClasses = (props: PtSwitchProps) => {
  const { disabled = false, className } = props;

  const wrapper = [
    'relative inline-flex items-center gap-pt-1 select-none text-pt-content-default',
    disabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer',
    className
  ]
    .filter(Boolean)
    .join(' ');

  const input = 'pointer-events-none absolute m-0 h-px w-px opacity-0 peer';

  const track = [
    'relative inline-flex h-[32px] w-[56px] shrink-0 items-center justify-start rounded-full bg-pt-surface-3 p-[3px]',
    'transition-[background-color,border-color,box-shadow] duration-200 ease-in-out',
    'peer-checked:border-pt-secondary peer-checked:bg-pt-secondary',
    'peer-checked:[&_[data-switch-thumb]]:translate-x-[24px]',
    'peer-checked:[&_[data-switch-icon-off]]:text-pt-primary',
    'peer-checked:[&_[data-switch-icon-on]]:text-pt-surface-0',
    'peer-focus-visible:border-pt-focus peer-focus-visible:bg-pt-content-primary',
    'peer-focus-visible:ring-2 peer-focus-visible:ring-pt-focus peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-pt-surface-0'
  ].join(' ');

  const thumb = [
    'absolute left-[4px] top-1/2 h-[24px] w-[24px] -translate-y-1/2 rounded-full bg-pt-content-primary shadow-sm',
    'transition-transform duration-200 ease-in-out'
  ].join(' ');

  const iconBase = [
    'absolute top-1/2 z-[2] inline-flex -translate-y-1/2 items-center justify-center',
    'pointer-events-none transition-[opacity,transform,color] duration-200 ease-in-out'
  ].join(' ');

  const iconOff = [iconBase, 'left-[9px] text-pt-surface-0'].join(' ');
  const iconOn = [iconBase, 'right-[9px] text-pt-content-primary'].join(' ');

  const label = 'font-pt-body text-pt-body-small';

  return { wrapper, input, track, thumb, iconOff, iconOn, label };
};
