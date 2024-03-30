1. Http protocol
    - Tạo một package.json bằng cách npm init, index.js
    npm i express
    - Tại thẻ index.js nạp chương trình vào => chạy http://localhost:3000
    Xem ở trên trang expressjs để biết thêm chi tiết
2. Nodemon
    - Sử dụng với mục đích ko cần chạy lại files, nó sẽ following theo files (tự động khởi động lại ứng dụng node khi phát hiện các thay đổi tệp trong thư mục)
    npm i --save-dev nodemon
    - Trong thẻ scripts của package.json tạo "start": "nodemon index.js" => dùng để khởi chạy bằng cách npm start
    "start": "nodemon --inspect index.js" ta sử dụng --ispect để debug
3. Morgan
    - Dùng để ghi nhật kí yêu cầu của HTTP
    npm i morgan --save-dev
    - Thêm vào file index.js
        const morgan = require('morgan')
        app.use(morgan('combined'))
4. Template engine(handlebars)
    - Mục là viết mã HTML ở file ở nơi khác gọn hơn rồi export về file chính. Hiện tại mình không sử dụng được module fs.
    npm i express-handlebars
    - Tạo folder src chứa:
        a. index.js và đi sửa ở file package.json thành src/index.js
        b. Thêm const handlebars  = require('express-handlebars').engine
        c. app.engine('handlebars', handlebars()) => app sử dụng template engine là handlebars vs tên là handlebars và sử dụng thư viện handlebars
            app.set('view engine', 'handlebars') => sử dụng handlebars, đặt view engine là handlebars
        d. Trong src tạo folder là resources chứa scss và view
            Trong views chứa home.hbs và layouts
            Trong layout chứa main.hbs
        e. Thêm app.set('views', path.join(__dirname, 'resources/views')) Cái này mình vẫn chưa hiểu
        f. Sửa lỗi Error: ENOENT: no such file or directory, open           'D:\Workspace\nodejs\Blog\src\resources\views\layouts\main.handlebars'
            Ta đi thêm vào nội dung của main.hbs
        g. ta thêm đường dẫn news và thêm file news.hbs vào để khi truy vấn vào đường link http://localhost:3000/news sẽ render đc
        h. Đi sửa đuôi của handlebars thành hbs
            app.engine('hbs', handlebars({
                extname: '.hbs'
            }))
        i. Tách header và footer ra 2 file khác
            - Nó nằm ở folder partials
        l. Giải thích code
            app.engine('hbs', handlebars({
                extname: '.hbs'
            }))
                -Một phương thức để đăng ký một template engine (máy chủ mẫu) với ứng dụng Express là handlebars
            app.set('view engine', 'hbs')
                -Thiết lập các giá trị cấu hình cho ứng dụng,  Handlebars sẽ được sử dụng làm template engine cho ứng dụng.
            app.set('views', path.join(__dirname, 'resources/views'))
                -Tạo ra đường dẫn, thiết lập thư mục chứa tệp mẫu
            - Template engine (đôi khi được gọi là view engine) là một công cụ cho phép bạn tạo các trang HTML động dựa trên các dữ liệu được truyền vào từ ứng dụng web của bạn. Thay vì tạo các trang HTML tĩnh và lặp đi lặp lại các đoạn mã HTML, bạn có thể sử dụng template engine để tạo các mẫu có thể tái sử dụng, được lập trình động và linh hoạt.
5. Static file & SCSS
    a. Thêm ảnh vào thư mục public/img/logo.png
        - Thêm vào file index.js: app.use(express.static(path.join(__dirname, 'public')))
            - Giải thích express.static(): express.static() là một middleware được tích hợp sẵn trong Express để phục vụ các tệp tĩnh như HTML, CSS, JavaScript và hình ảnh. Middleware này cho phép bạn chỉ định một thư mục nơi các tệp tĩnh sẽ được phục vụ cho các yêu cầu HTTP. Middleware là một phần mềm đóng vai trò như một lớp trung gian giữa các yêu cầu (request) và phản hồi (response) trong quá trình xử lý một ứng dụng web. Middleware có thể xử lý các yêu cầu, sửa đổi các phản hồi hoặc đơn giản là chuyển tiếp các yêu cầu tới middleware hoặc route tiếp theo trong chuỗi middleware. Trong ứng dụng Express, middleware được xác định bằng cách sử dụng phương thức use() hoặc các phương thức tương tự get(), post(), put() và delete() để định nghĩa các middleware cho các route cụ thể. Middleware được thực thi tuần tự theo thứ tự được định nghĩa trong ứng dụng.
            - Thêm các file trong thư mục public. Khi nhận được một yêu cầu HTTP để truy cập tệp tĩnh, middleware này sẽ tìm kiếm tệp tương ứng trong thư mục public và gửi phản hồi HTTP chứa tệp đó cho client.
            - Khi nhận đường dẫn từ client: img/logo.png thì kiểm tra vs file tĩnh có trong folder public.
    b. npm install --save-dev sass
        - Thêm vào scripts "watch": "sass --watch src/resources/scss/app.scss src/public/css/app.css".
        - SCSS cho phép bạn sử dụng các tính năng không có trong CSS truyền thống, chẳng hạn như biến, lồng trong, phạm vi và các hàm toán học, giúp cho việc viết CSS dễ dàng hơn và có thể tái sử dụng được nhiều lần. SCSS sử dụng cú pháp tương tự như CSS, với một số cú pháp mới được bổ sung vào để hỗ trợ các tính năng mới.
        - Node-sass là một thư viện cung cấp liên kết cho Node.js với LibSass, phiên bản C của bộ tiền xử lý biểu định kiểu phổ biến, Sass. Nó cho phép bạn biên dịch các tệp .scss thành css với tốc độ đáng kinh ngạc và tự động thông qua một phần mềm trung gian kết nối.
        - Thêm folder scss vào resources, css vào public
    c. Cấu hình cho sass truyền dữ liệu qua css (biên dịch sass qua css)
        scripts: "watch": "sass --watch src/resources/scss/app.scss src/public/css/app.css", --watch khi ta thay đổi bên scss thì css sẽ thay đổi theo mà ta ko cần chạy cú pháp lại.
        Sử dụng lệnh npm run watch
    d. Thêm vào thẻ html là đường dẫn /css/app.css ở file main.hbs
        - Ta có thể thêm vào scss _variables để lưu những định dạng cố định: @import 'variables';
6. USE bootstrap
    a. <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    b. Thêm dữ liệu của header.hbs vào
7. Basic routing
    - Định tuyến các yêu cầu từ client tới các middleware xử lý. Định tuyến đề cập đến việc xác định cách ứng dụng phản hồi yêu cầu của máy khách tới một điểm cuối cụ thể, đó là một URI (hoặc đường dẫn) và một phương thức yêu cầu HTTP cụ thể (GET, POST, v.v.). Để định nghĩa route cho các phương thức này, ta có thể sử dụng các phương thức tương ứng của đối tượng app, ví dụ app.post(), app.put(),...
    - Định nghĩa các tuyến đường và truy cập vào nó
    - req: chứa các thông tin mà ứng dụng gửi lên server
    - res: setup trả về ntn
    Url {
        protocol: null,
        slashes: null,
        auth: null,
        host: null,
        port: null,
        hostname: null,
        hash: null,
        search: null,
        query: [Object: null prototype] {},
        pathname: '/',
        path: '/',
        href: '/'
    }
8. GET METHOD
9. Query parameters
    - Query parameters là một chuỗi truy vấn được client gửi lên server. Server sẽ nhận các thông tin này để xử lý và trả về một kết quả phù hợp với truy vấn được gửi lên.
    - Các chuỗi truy vấn có thể được đính kèm trong một URL. Trong URL, các truy vấn sẽ bắt đầu từ sau dấu ? , mỗi truy vấn là một cặp {key:value}, các cặp ngăn cách nhau bởi kí tự & tạo thành một object gọi là param và được gửi lên server. 
        Ví dụ: http://example.com/users?name=viblo&age=20 
            {
                name: "viblo",
                age: "20"
            }
    a. Thêm app.get('/search', (req, res) => {
                res.render('search')
            })
    b. Thêm search.hbs trong folder views và đưa dữ liệu vào
10. Default behavior of HTML forms
    Đi định dạng ở search trong file scss
    Ta có thể sử dụng phương thức POST thay cho get
        a. Thay get ở trong index.js và search.hbs(thẻ form: method)
    - Đi thay đổi hành vi mặc định của form
        form: action="": submit ở đâu(url nào) ở request URL
            method: submit vs method nào
        Vậy nên ở bài này ta thêm ở action="/news": news ở đây là nơi ta muốn nhận
        - Thuộc tính action trong form: thuộc tính để thiết lập URL sẽ nhận dữ liệu, là địa chỉ mà dữ liệu của form gửi đến (submit đến, post đến). Thiếu tham số này thì action bằng URL đang truy cập (tức gửi thông tin form đến server theo địa chỉ đang truy cập). Web server nhận được dữ liệu, xử lý và trả về nội dung nào đó.(URL Chỉ định nơi gửi dữ liệu biểu mẫu khi biểu mẫu được gửi). Được sử dụng để chỉ định đường dẫn tới tập tin xử lý dữ liệu khi biểu mẫu được gửi đi.
        - Thuộc tính method trong form: thuộc tính để thiết lập HTTP Method, xem thêm HTTP Request Message thường có giá trị bằng get hoặc post. Nếu không viết thuộc tính này thì method mặc định của form là get
11. POST method
    Gửi dữ liệu từ client lên server.
    - Trong Express, để gửi phản hồi (response) từ máy chủ (server) tới trình duyệt (browser) của khách hàng (client), chúng ta sử dụng phương thức "send()" của đối tượng response. Phương thức "send()" được sử dụng để gửi dữ liệu văn bản, HTML, JSON hoặc bất kỳ kiểu dữ liệu nào khác từ máy chủ đến trình duyệt của khách hàng.
    - Đối vs method GET thì khi submit nó sẽ đính query parameters lên URL
    - Đối vs method POST ẩn trên URL - FORM DATA
    a. Thêm vào index.js 
        app.post('/search', (req, res) => {
            res.send()
        })
    b. Sửa search.hbs method là POST và action trống
        - Trong Express, "req.body" là một thuộc tính của đối tượng "request" được sử dụng để lấy dữ liệu gửi đến từ trình duyệt của khách hàng thông qua phương thức POST hoặc PUT. Thuộc tính "req.body" sẽ chứa các thông tin mà khách hàng đã gửi đến server trong phần thân của yêu cầu.
        - Thêm middleware
12. (Bài 19) Mô hình MVC
    Model, View, Controller
    - View: chứa thành phần view là HTML và CSS
    - Model: là thành phần tương tác vs data resort(lưu ở mysql, mongodb,...)
    - Controller: trung chuyển giữa Model và View, có nghĩa là sử lí ở View đưa vào Model và ngược lại
    - Routes: Dùng để định tuyến, định tuyến đường
    - Web Server được hiểu là các máy chủ web, là những chiếc máy tính hoặc cụm máy tính mạnh mẽ để phục vụ nhiều mục đích khác nhau trong mạng lưới Web.
    
13. (Bài 20) Routes & Controllers
    app.get('/student', (req, res) => {
        res.render('student')
    })
    app.METHOD(PATH, Function Handlers)
    - Để có mô hình MVC thì ta cần đưa Function Handlers vào một thư mục riêng => là controllers
    - Tạo thư mục routes, app/controllers trong thư mục src
        + routes: chứa cái file js => định tuyến
        + controllers: function handlers
    - Ví dụ: Tạo file news.js ở routes để định tuyến đường
            Tạo file NewsController ở app/controller để xử lý (sử dụng class và bên trong nó các Method)
            Có một câu hỏi là vì sao sử dụng "class"
    - Xử lý tuyến đường nên tách ra từng file riêng biệt để dễ quản lí
14. Tải và cài đặt MongoDB
15. Prettier - Code formatter
    Trình định dạng lại code
16. Sử dụng MongoDB
    - Tạo mới một csdl và thêm các data vào
17. [MVC] Model
    - link: https://github.com/Automattic/mongoose
    - install mongoose
        + npm install mongoose
    - connect to DB
        + Tạo config/db bên trong src file index.js => liên kết giữa node với mongodb => Viết code liên kết
        + Trường hợp khi ra lỗi Fail(chạy tầm 30s) => Khắc phục: If the local connection fails then try using 127.0.0.1 instead of localhost. Sometimes issues may arise when the local hostname has been changed.
        B1: importing
        B2: Connecting to MongoDB
        + Try catch là một khối lệnh dùng để bắt lỗi chương trình trong javascript. 
            1. Khối mã bên trong try được thực thi tuần tự từ trên xuống dưới.
            2. Nếu không có lỗi nào xảy ra trong khối mã try, phần catch sẽ được bỏ qua và luồng thực thi sẽ tiếp tục sau khối try-catch.
            3. Nếu có lỗi xảy ra trong khối try, quá trình thực thi sẽ dừng và lỗi sẽ được chuyển đến phần catch.
            4. Phần catch sẽ nhận một tham số error (hoặc bất kỳ tên nào bạn muốn) chứa thông tin về lỗi xảy ra.
            5. Khối mã bên trong catch sẽ được thực thi để xử lý lỗi. Sau khi thực thi xong, luồng thực thi sẽ tiếp tục sau khối try-catch.
    - Creat model
        + trong app tạo models/Course.js => Định dạng data lưu ở mongodb
        + Kết nối controller và model: lấy và trả data
            Ví dụ: Đứng ở controllers tương tác vs model để lấy data ở database và trả về client
        + Có một lỗi là find ko còn hỗ trợ callback nữa nên ta sử dụng then và catch (vì là Promise)
18. Install JSON viewer extention
    - JSON viewer
    - Route methods
    - App listen log
    - Resource path
19. (Bài 27) Read from DB
    - Ta đi code : tạo một giao diện là các khóa học, là một khối chứa tên mô tả và chức năng mua khóa học
    - https://handlebarsjs.com/guide/#what-is-handlebars 
    - https://github.com/handlebars-lang/handlebars.js
    - https://handlebarsjs.com/guide/#installation => cách sử dụng hdb để viết giao diện bằng cách: từ data lưu ở database (sẽ là đầu vào) viết ở view dạng  {{}} để xuất ra
    - Với đầu vào là array (bởi vì dữ liệu đưa vào là array: do 2 object nối tiếp nhau liên tiếp) ta đi sử lí :https://handlebarsjs.com/examples/builtin-helper-each-block.html
    - Tạo khối hiển thị một khóa học và css để giao diện dễ nhìn : https://getbootstrap.com/docs/4.0/components/card/
    - có một lỗi bảo mật của hdb: ko cho trực tiếp truy cập thuộc tính qua views của object
        + Ví dụ, trong Mongoose, khi bạn truy vấn dữ liệu từ cơ sở dữ liệu MongoDB, đối tượng kết quả sẽ là một đối tượng Mongoose Document. Bằng cách sử dụng phương thức toObject(), bạn có thể chuyển đổi đối tượng Mongoose Document thành một plain JavaScript object.
            const mongoose = require('mongoose');

            // Định nghĩa schema cho collection 'courses'
            const courseSchema = new mongoose.Schema({
            name: String,
            description: String,
            image: String,
            createdAt: Date,
            updatedAt: Date
            });

            // Tạo model từ schema
            const Course = mongoose.model('Course', courseSchema);

            // Truy vấn dữ liệu từ MongoDB và nhận về một đối tượng Mongoose Document
            Course.findOne({ name: 'Lập Trình JavaScript Cơ Bản' })
            .then(course => {
                // Chuyển đổi đối tượng Mongoose Document thành plain JavaScript object
                const plainObject = course.toObject();
                console.log(plainObject);
            })
            .catch(error => {
                console.error(error);
            });
            + Phương thức toObject() trong trường hợp này được gọi trên đối tượng course, là một đối tượng Mongoose Document, và trả về một plain JavaScript object có các thuộc tính tương tự.

            + Lưu ý rằng sự có mặt của phương thức toObject() hoặc các chức năng tương tự phụ thuộc vào framework hoặc thư viện JavaScript mà bạn đang sử dụng.
            + Trong JavaScript, một plain JavaScript object là một đối tượng thông thường được tạo ra bằng cách sử dụng cú pháp đối tượng ({}) hoặc từ khóa "new Object()". Đây là một đối tượng đơn giản không liên quan đến bất kỳ framework hoặc thư viện cụ thể nào. 
                const course = {
                _id: new ObjectId("6470d1fde79591dbcad32d77"),
                name: 'Lập Trình JavaScript Cơ Bản',
                description: 'Học Javascript cơ bản phù hợp cho người chưa từng học lập trình. Với hơn 100 bài học và có bài tập thực hành sau mỗi bài học.',
                image: 'https://files.fullstack.edu.vn/f8-prod/courses/1.png',
                createdAt: '2023-05-28T01:45:53.037Z',
                updatedAt: '2023-05-28T01:45:53.037Z'
                };
    - Tạo trong src thư mục util: nó chứa mongoose.js là công cụ để xử lí data của mongo
20. (Bài 28) Course detail page
    - Ở bài này ta sẽ thêm các tuyến đường để định tuyến khi bấm vào một khóa học
    - Click vào một khóa học sẽ chuyển vào trang chi tiết(thêm thẻ a)
    - Thêm ở routes: course.js
    - Thêm ở controllers: CourseController.js
    - Thêm đường dẫn ở routes: index.js
    - routes: ở index.js xuất route(lấy từ các file khác) đưa vào file index.js tổng để đưa đến controllers để liên kết và tạo đường dẫn
    - Dựa vào chuỗi slug để lấy bản ghi để hiển thị ra khóa học
    - Tùy từng khóa học phải chọc đúng từng slug(từng tuyến đường ứng với từng khóa học)
        + Course.findOne() là một phương thức trong hệ thống quản lý cơ sở dữ liệu (database management system) được sử dụng để truy vấn và lấy ra một bản ghi duy nhất từ một bảng hoặc một collection trong cơ sở dữ liệu.
        + Course.findOne({ slug: req.params.slug }):  là một truy vấn để tìm kiếm một bản ghi trong cơ sở dữ liệu, sử dụng giá trị của req.params.slug như một tiêu chí tìm kiếm. Trong ví dụ trên, khi một yêu cầu GET được gửi đến đường dẫn /courses/my-course, req.params.slug sẽ có giá trị 'my-course'. Course.findOne() sẽ truy vấn cơ sở dữ liệu để tìm khóa học có trường slug bằng 'my-course'.
    - Đi tạo giao diện cho một khóa học ở views: courses/show.hbs
    - Sửa khi bấm vào F8-education phải link đc vào trang chủ
21. (Bài 29) Create new course
    - tạo create.hbs trong views/courses
    - sử dụng thư viện: https://www.npmjs.com/package/mongoose-slug-updater để tạo slug
    - khi tạo 2 khóa học có slug giống nhau sử dụng unique: true
22. (Bài 30) Update course
    - Đi sửa phần header: phần đăng khóa học cho vào một khối chứa
        + Ở bootrap 4: lấy html/css dropdown
    - Tạo một trang quản lí khóa học(những khóa học đã đăng)
    - Ở routes tạo một file me.js
    - Ở controller tạo MeController.js
    - views Tạo folder me: stored-courses.hbs
        + tạo bảng chứa danh sách khóa học: https://getbootstrap.com/docs/4.0/content/tables/
        + Vấn đề chỉ mục: {{@index}} nhưng nó sẽ bắt đầu từ 0 vậy nên ta phải tạo một hàm sum để tính tổng nó vs 1(tăng index lên 1 đơn vị)
    - Thêm nút sửa và xóa
    - Thêm ở views/courses edit.hbs để tạo giao diện sửa
    - Course.findById(req.params.id): để tìm kiếm một khóa học dựa trên tham số id từ đối tượng req.
    - Hiện tại form chỉ hỗ trợ việc submit dưới phương thức là get và post còn các phương thức sẽ auto chuyển về get => https://expressjs.com/en/resources/middleware/method-override.html
        + npm install method-override
        + const methodOverride = require('method-override')
        + https://mongoosejs.com/docs/models.html#updating
    - updateOne là một phương thức được cung cấp bởi thư viện MongoDB để cập nhật một bản ghi duy nhất. Phương thức này cho phép bạn thay đổi nội dung của một tài liệu (document) trong một bộ sưu tập theo một điều kiện nhất định.
    - Trong Node.js, res.redirect là một phương thức được sử dụng để chuyển hướng (redirect) người dùng từ một URL đến một URL khác.
23. Delete course
    - Bản chất là ta đi tạo một method để xóa, còn các cái như tạo chỉnh sửa là phải tạo một trang mới để ta tùy chỉnh
    - Phương thức Course.deleteOne() trong Node.js là một phương thức được sử dụng để xóa một bản ghi (document) trong cơ sở dữ liệu MongoDB. Để sử dụng phương thức deleteOne(), bạn cần có một đối tượng Model đã được định nghĩa bằng Mongoose. Thông thường, bạn sẽ định nghĩa một Model bằng cách sử dụng Schema và Mongoose sẽ tạo ra một collection trong cơ sở dữ liệu MongoDB tương ứng với Model đó.
    - khi click vào nút xóa thì phải chuyển hướng phương thức sang delete(phương thức mà ta đã tạo dùng để xóa)
24. (Bài 32) Soft delete 
    - Chức năng:
        + Delete (soft)
        + Restore
        + Force delete
    - Kỹ thuật xóa mềm
    - thêm vào data một trường là deletedAt: khi có trường này ko có hoặc có giá trị null thì khóa học sẽ ko bị xóa, ngược lại khi có thì sẽ xóa và đưa vào thùng rác(trường này dùng để lưu thời gian ta xóa)
    - Ghi đè:
    - Sử dụng thư viện: https://www.npmjs.com/package/mongoose-delete#simple-usage
        + npm install mongoose-delete -force
    - Khi một document có delete: true nhờ ghi đè({ overrideMethods: 'all' }) mà sẽ xóa ra khỏi kết quả hiển thị
    - Khi ko có dữ liệu thì đi html/css thêm vào là tạo đường dẫn đến trang đăng khóa học
    - Đi tạo views thùng rác:
        + ở me.js : tạo đường dẫn trash/course và phương thức trashCourses()
        + Vào MeController.js: trashCourses()
        + ở folder me: tạo trash-courses.hbs là views của thùng rác
    - Dòng code const courseId = $(this).data('id'); được viết bằng JavaScript và sử dụng thư viện jQuery. Nó được sử dụng để lấy giá trị của thuộc tính "data-id" từ phần tử HTML mà đang được xử lý.
    - Làm nút xóa vĩnh viễn
25. (Bài 34) "Select all" with checkbox
    - Tạo nút để check, chọn tất cả để xóa tất cả hoặc một số khóa học cùng một lúc
    - Tạo form có những cái sao:
        + Một nút checkbox dùng để check tất cả
        + Một select để chọn các options
        + Một nút button dùng để thực thi việc check đó
            - Khi ko có check nút đó disabled hoàn toàn chứ ko phải là chỉ chuyển màu
            - Không dùng disabled ở thẻ class mà dùng ở bên ngoài
    - Đi xây dựng nút check, khi ta chọn tất cả thì nút chọn tất cả phải check và ngược lại
        + Dùng jquery : Phương thức change() kích hoạt sự kiện thay đổi hoặc đính kèm một chức năng để chạy khi xảy ra sự kiện thay đổi. Trong jQuery, $(this) đại diện cho phần tử hiện tại đang được xử lý. Khi sử dụng $(this), bạn đang tham chiếu đến phần tử DOM cụ thể mà sự kiện đã xảy ra hoặc đang được thực hiện trên đó.
            - Trong jQuery, $(this).prop() là một phương thức được sử dụng để truy xuất hoặc thay đổi các thuộc tính của phần tử hiện tại. (Đặt hoặc trả về các thuộc tính và giá trị của các phần tử được chọn.)
                Cú pháp: $(this).prop(propertyName) :
                    $(this) đại diện cho phần tử hiện tại.
                    propertyName là tên thuộc tính của phần tử mà bạn muốn truy xuất hoặc thay đổi.
        + Tiếp theo bấm vào nút "thực hiện" sẽ thực thi theo option mà ta chọn
            - Trong jQuery, $(this).hasClass('disabled') được sử dụng để kiểm tra xem phần tử hiện tại có chứa lớp CSS "disabled" hay không.
            - { _id: { $in: req.body.courseIds } }: $in là một toán tử truy vấn trong MongoDB, được sử dụng để kiểm tra xem một giá trị có xuất hiện trong một mảng giá trị hay không. Tìm kiếm các tài liệu trong bộ sưu tập mà có trường _id có giá trị xuất hiện trong mảng req.body.courseIds.
26. (Bài 36) Middleware
    - Làm chức năng sắp xếp
    - Middleware: Phần mềm trung gian(Đứng giữa các thành phần trong mô hình phần mềm)