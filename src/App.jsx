import './App.css';
import { useState } from 'react';
import Form from './components/Form';
import Input from './components/Input';
import WelcomePopup from './components/welcomePopup';

export default function App() {
    const [user, setUser] = useState({ username: '', password: '' });
    const [registerResponse, setRegisterResponse] = useState('');
    const [loginResponse, setLoginResponse] = useState('');

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
            const res = await data.json()
            // if(!res) {
            //     throw new Error('Username already exist!')
            // }
            console.log(res)
            setRegisterResponse(res.data)
        } catch(err) {
           console.log(err)
        }

        
      

        


    };

    const login = async (e) => {
        e.preventDefault();
        // Write your login code here

        const post = {
            method: 'POST', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        }

        const data = await fetch('http://localhost:4000/login',post);
        const res = await data.json()
        setLoginResponse(res.data)
      

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
