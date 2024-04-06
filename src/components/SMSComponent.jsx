import React, { useState } from 'react';

function SMSComponent() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');
    const [isSending, setIsSending] = useState(false); // 添加一个状态表示是否正在发送

    const sendSMS = () => {
        if (!phoneNumber || !message) {
            setStatus('Please enter both phone number and message.');
            return;
        }

        setIsSending(true); // 开始发送，禁用按钮
        const url = 'http://localhost:3173/send-sms'; // 将地址改为绝对路径或从配置读取

        const data = {
            to: phoneNumber,
            from: 'Vonage APIs', // 替换为你的 Vonage 号码
            text: message
        };

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            setIsSending(false); // 完成发送，启用按钮
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            setStatus('Message sent successfully');
            console.log(data);
            setPhoneNumber(''); // 清除表单
            setMessage('');
        })
        .catch(error => {
            setStatus('Error sending message');
            console.error('Error:', error);
        });
    };

    return (
        <div>
            <h2>Send SMS</h2>
            <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter phone number"
            />
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter message"
            />
            <button onClick={sendSMS} disabled={isSending}>Send Message</button>
            <p>Status: {status}</p>
        </div>
    );
}

export default SMSComponent;
