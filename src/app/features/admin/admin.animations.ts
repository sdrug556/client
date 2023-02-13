import {
  animate,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const routeAnimations = trigger('routeAnimations', [
  transition('* => *', [
    query(
      ':enter',
      style({
        position: 'absolute',
        top: '0px',
        left: '0px',
        width: '100%',
        transform: 'translateY(-10px)',
        opacity: '0',
      }),
      { optional: true }
    ),
    query(
      ':leave',
      [
        style({
          position: 'absolute',
          top: '0px',
          left: '0px',
          width: '100%',
          transform: 'translateY(0px)',
          opacity: '1',
        }),
        animate(
          '250ms ease-out',
          style({
            position: 'absolute',
            top: '0px',
            left: '0px',
            width: '100%',
            transform: 'translateY(10px)',
            opacity: '0',
          })
        ),
      ],
      { optional: true }
    ),
    query(
      ':enter',
      [
        animate(
          '250ms ease-in',
          style({
            position: 'absolute',
            top: '0px',
            left: '0px',
            width: '100%',
            transform: 'translateY(0px)',
            opacity: '1',
          })
        ),
      ],
      { optional: true }
    ),
  ]),
]);
