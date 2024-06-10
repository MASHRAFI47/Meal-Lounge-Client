import logo from '../../assets/mealloungewhite.png'

const Footer = () => {
  return (
    <footer className="footer p-10 bg-[#141D33] text-base-content relative top-80">
      <aside className="text-white">
        <img src={logo} className='w-24' alt="" />
        <p>Meal Lounge.<br />Providing fresh meals since 2022</p>
      </aside>
      <nav className="text-white">
        <h6 className="footer-title text-[#4cfff3]">Services</h6>
        <a className="link link-hover">Branding</a>
        <a className="link link-hover">Design</a>
        <a className="link link-hover">Marketing</a>
        <a className="link link-hover">Advertisement</a>
      </nav>
      <nav className="text-white">
        <h6 className="footer-title text-[#4cfff3]">Company</h6>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Jobs</a>
        <a className="link link-hover">Press kit</a>
      </nav>
      <nav className="text-white">
        <h6 className="footer-title text-[#4cfff3]">Legal</h6>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </nav>
    </footer>
  )
}

export default Footer