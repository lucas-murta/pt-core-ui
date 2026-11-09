export const interactionsHoverPressed = [
  'overflow-hidden',
  'outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-pt-focus focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
  'hover:shadow-pt-action-hover active:shadow-pt-action-pressed',
  'before:z-10 before:absolute before:inset-0 before:transition-all before:duration-300 before:ease-in-out',
  'before:bg-[--pt-color-hover] before:opacity-0 before:mix-blend-soft-light',
  'hover:before:bg-[--pt-color-hover] hover:before:opacity-100',
  'active:before:bg-[--pt-color-pressed] active:before:opacity-100',
  'after:z-10 after:absolute after:inset-y-0 after:right-0 after:w-[105%] after:transition-all after:duration-300 after:ease-in-out',
  'after:opacity-0 after:mix-blend-color-dodge',
  'after:bg-[linear-gradient(100deg,var(--pt-shadow-scale-300)_0,var(--pt-light-scale-300)_100%)]',
  'hover:after:right-[-2.5%] hover:after:opacity-100',
  'active:after:right-[-5%]'
]
  .filter(Boolean)
  .join(' ');
