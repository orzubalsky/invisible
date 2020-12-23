import clsx from 'clsx'
import CloseButton from 'components/CloseButton/CloseButton'
import './About.css'


export const About = ({ handleClose, isVisible }) => {
  const className = clsx('About', isVisible && 'visible')

  return (
    <div className={className}>
      <CloseButton onClick={handleClose} />
      <p>
        <i>"I am invisible, understand, simply because people refuse to see me."</i>
      </p>
      <p>
        On September 16, 2013, the Randolph County Board of Education in Central North Carolina banned Ralph Ellison's book <i>Invisible Man</i> after a complaint from a student's mother. One board member who supported her complaint stated that he "didn't find any literary value" in Ellison's account of African-American alienation in the United States in the early 20th century. The ban remained for a mere nine days until it was lifted by the North Carolina School Board under much fire by the public.
      </p>
      <p>
        Over sixty years after the book's publication date, even after winning the National Book Award for fiction in 1953 and being named by the Library of Congress as one of the "Books That Shaped America," this incident demonstrates the precarity that a work, even one that has been nationally recognized, faces in a cultural climate of a country that has not resolved its history of racial oppression. This issue is particularly timely now as structural violence against people of color has been gaining national attention after the police shooting of Michael Brown in Ferguson, MO.
      </p>
      <p>
        In <i>Invisible Man</i>, the main character struggles to do good in the world, but is thwarted by structures instituted to maintain the status quo. He eventually aligns himself with the invisible, those who tip-toe precariously at the periphery of our society. In this online collaborative platform, built specifically for the purpose of civil disobedience, we are asking participants to read out loud and record as much or as little of the book as they want in a show of solidarity with the invisible. The platform is readily customizable for any text facing censorship and is open source for others to use. While willfully violating copyright laws, the <i>Invisible Library</i> asks how works of literature might find new avenues for appreciation through digital media.
      </p>
      <p>
        Through the voice, may we collectively enact a visibility.
      </p>
      <br />
      <p>
        <b>Contribute</b>
      </p>
      <ul>
        <li>Click <i>Contribute</i>.</li>
        <li>Choose a page that has not been recorded.</li>
        <li>Record the text on an iphone, portable recorder, or call +1 877-977-3352.</li>
        <li>Upload file.</li>
      </ul>
    </div>
  )
}

export default About
