import IButtonProps from './Button.props';
import cn from 'classnames';
import styles from './Button.module.css';

const Button = ({ children, className, appearence = 'small', ...props }: IButtonProps) => {
   return (
      <button
         className={cn(styles['button'], styles['accent'], className, {
            [styles['small']]: appearence === 'small',
            [styles['big']]: appearence === 'big',
         })}
         {...props}
      >
         {children}
      </button>
   );
};

export default Button;
