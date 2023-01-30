import pic1 from '../../features/public/images/oneplus-10-pro-cnet-review-12.webp'
import pic2 from '../../features/public/images/phone-g58397b2e4_640.jpg'
import pic3 from '../../features/public/images/girl-gf0a931e06_640.jpg'
import pic4 from '../../features/public/images/train-track-ga2762d793_640.jpg'
import pic5 from '../../features/public/images/iphone-g5cd953fbf_640.jpg'
import pic6 from '../../features/public/images/mobile-phone-g38619b98a_640.jpg'

const AboutPage = () => {
    return (
        <div className="container mt-3">
            <h1 className="text-center text-danger">Who we are?</h1>
            <div className="text-center">
                <p>
                    <b>
                        We are group of friends that wanted to make community
                        that shared their love for phones. <br /> In the past
                        when we were kids we always dreamed about having our own
                        website!
                        <br />
                    </b>
                </p>
                <br />
                <h2 className="text-danger">What is the site used for?</h2>
                <p>
                    <b>
                        This website is for those who loves phones and for
                        people that care about technology <br />
                        In the website you can sign up as admin or as normal
                        user. <br />
                        As admin you can add new products, edit them and delete
                        them. you can also add to favorites your products.
                        <br />
                        As normal user you can only add products to favorites
                    </b>
                </p>
                <h3 className="text-danger">Our Model</h3>
                <p>
                    <b>
                        We want to give you the choice which kind of user you
                        want to be. <br />
                        For those who sign up as admin and decide they want to
                        add prodcts, you will have to fill these fields: <br />
                        Product Name, Product Description, Product Price,
                        Product Image,Product Quantity. you can also add product
                        Categories and organize your products
                    </b>
                </p>
            </div>

            <div className="row">
                <div className="col-lg-4 col-md-12 mb-4 mb-lg-0">
                    <img
                        src={pic1}
                        className="w-100 shadow-1-strong rounded mb-4"
                        alt="phones"
                    />

                    <img
                        src={pic2}
                        className="w-100 shadow-1-strong rounded mb-4"
                        alt="apps"
                    />
                </div>

                <div className="col-lg-4 mb-4 mb-lg-0">
                    <img
                        src={pic3}
                        className="w-100 shadow-1-strong rounded mb-4"
                        alt="girl holding phone"
                    />

                    <img
                        src={pic4}
                        className="w-100 shadow-1-strong rounded mb-4"
                        alt="man walking on train tracks"
                    />
                </div>

                <div className="col-lg-4 mb-4 mb-lg-0">
                    <img
                        src={pic5}
                        className="w-100 shadow-1-strong rounded mb-4"
                        alt="hand holding phone"
                    />

                    <img
                        src={pic6}
                        className="w-100 shadow-1-strong rounded mb-4"
                        alt="castle come out from phone"
                    />
                </div>
            </div>
        </div>
    )
}
export default AboutPage
