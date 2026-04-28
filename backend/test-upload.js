import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';

async function test() {
  const form = new FormData();
  form.append('email', 'work.mayanksaini@gmail.com');
  form.append('image', Buffer.from('test'), { filename: 'test.jpg' });

  try {
    const res = await axios.post('http://localhost:2001/user/uploadProfilePic', form, {
      headers: form.getHeaders(),
    });
    console.log(res.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
  }
}
test();
