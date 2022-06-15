import './App.css';
import { useState } from 'react';
import Form from './components/Form';
import Input from './components/Input';
import WelcomePopup from './components/welcomePopup';
import ErrorMessage from './components/errorMessage';

export default function App() {
    const [user, setUser] = useState({ username: '', password: '' });
    const [registerResponse, setRegisterResponse] = useState('');
    const [loginResponse, setLoginResponse] = useState('');
    const [error,setError] = useState(false);
    const [errorMessage,setErrorMessage] = useState();

    const register = async (e) => {
        e.preventDefault();
        // Write your register code here
          console.log(user)
        const post = {
            method: 'POST', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        }
        try {
            const data = await fetch('http://localhost:4000/register',post);
            console.log(data)
            if(data.status === 400) {
                throw new Error('Username already exist!')
            }
            const res = await data.json()
         
            console.log(res)
            setError(false)
            setRegisterResponse(res.data)
        } catch(err) {
            setError(true)
            setErrorMessage('Username already exist!')
           console.log(err)
        }

        
      

        


    };

    const login = async (e) => {
        e.preventDefault();
        // Write your login code here
         try {
            const post = {
                method: 'POST', // or 'PUT'
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            }
            const data = await fetch('http://localhost:4000/login',post);
            if(data.status === 401) {
                throw new Error('Invalid password or username')
            }
            const res = await data.json()
            setError(false)
            setLoginResponse(res.data)
         }catch(e) {
            setError(true)
            setErrorMessage('Invalid password or username')
            console.log(e)
         }

      

        console.log(loginResponse)
        
    };


    // You can safely ignore everything below this line, it's just boilerplate
    // so you can focus on the exercise requirements

    const handleChange = (e) => {
        const { value, name } = e.target;

        setUser({
            ...user,
            [name]: value
        });
    }
console.log(loginResponse)
    // console.log(registerResponse)
    return (
        <div className="App">

           {!registerResponse &&  !loginResponse && <h1>Register</h1>} 
          
           {!registerResponse &&  !loginResponse && <Form
                handleSubmit={register}
                inputs={[
                    <Input
                        key={1}
                        type='text'
                        name='username'
                        placeholder='Username'
                        value={user.username}
                        handleChange={handleChange}
                    />,
                    <Input
                        key={2}
                        type='password'
                        name='password'
                        placeholder='Password'
                        value={user.password}
                        handleChange={handleChange}
                    />
                ]}
            />
}
{error && <ErrorMessage msg={errorMessage} />}

            {registerResponse && !loginResponse &&  <WelcomePopup text={'Welcome to your new account!'} name={registerResponse.username}/>}

           {!loginResponse ? <h1>Login</h1> : <h1>Logout</h1>}

            {!loginResponse && <Form
                handleSubmit={login}
                inputs={[
                    <Input
                        key={1}
                        type='text'
                        name='username'
                        placeholder='Username'
                        value={user.username}
                        handleChange={handleChange}
                    />,
                    <Input
                        key={2}
                        type='password'
                        name='password'
                        placeholder='Password'
                        value={user.password}
                        handleChange={handleChange}
                    />
                ]}
            />}

            {loginResponse && <WelcomePopup text={'We are happy to see you again!'} name={loginResponse.username}/>}

        </div>
    );
}
