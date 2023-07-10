
import Link from "next/link";


const BurgerMenuto = () => {
  return (
    <section>
     <div className="navigation">
    <input type="checkbox" className="navigation__checkbox" id="navi-toggle"/>

    <label htmlFor="navi-toggle" className="navigation__button top-10 right-32 lg:!top-10 lg:right-60">
        <span className="navigation__icon">&nbsp;</span>
    </label>

    <div className=" blur-sm bg-white/90 navigation__background top-12  lg:!top-12 right-32 lg:right-64">&nbsp;</div>

    <nav className="navigation__nav">
        <ul className="navigation__list">
            <li className="navigation__item"><Link href="#" className="text-2xl lg:text-4xl navigation__link font-metalch !text-metal">About Us</Link></li>
     
            </ul>
    </nav>
</div>

    </section>
  )
}

export default BurgerMenuto