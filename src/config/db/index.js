const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/f8_education_dev', {
            // useNewUrlParser: true,
            // useUnifiedTopology: true
        });
        console.log('Connect sussecfully');
    }
    catch (error) {
        console.log('Fail!')
    }
}

module.exports = { connect };  // Dấu {} dùng để tạo một Object và chứa methods. Điều này cho phép bạn chỉ import và sử dụng phương thức connect, thay vì phải import toàn bộ module và truy cập vào phương thức bằng cách sử dụng tênModule.connect().
