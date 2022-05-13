interface LogoProps {
  size?: 'small' | 'medium' | 'large' | '';
}

export default function Logo(props: LogoProps) {
  return (
    <div className={`logo ${props.size ? `logo--${props.size}` : ''}`}>
       Invest in the films of tomorrow
       
    </div>
   
  );
  
}
