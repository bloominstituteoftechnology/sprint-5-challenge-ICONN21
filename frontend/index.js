async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇
  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`
//--------------------------------------------------------------//
function buildLearnerCard(learner, mentors) {
  const card = document.createElement('div')
  card.classList.add('card')

  const nameP = document.createElement('h3')
  nameP.textContent = `${learner.fullName}, ID ${learner.id}`

  const learnerEmail = document.createElement('div')
  learnerEmail.textContent = `${learner.email}`

  const learnerMent = document.createElement('h4')
  learnerMent.textContent = 'Mentors';
  learnerMent.classList.add('closed')
  learnerMent.addEventListener('click', function() {
    
    learnerMent.classList.toggle('open');
    learnerMent.classList.toggle('closed');
  })

  const myUl = document.createElement('ul');

  const mentorsNames = learner.mentors.map(id => {
    const mentorObj = mentors.find(mentor => id === mentor.id)
    return mentorObj
  })
  for(let mentor of mentorsNames) {
    const li = document.createElement('li')
    li.textContent = `${mentor.firstName} ${mentor.lastName}`;
    myUl.appendChild(li);
  }

  [nameP, learnerEmail, learnerMent, myUl].forEach(element => {
    card.appendChild(element)
  })
  //---------------------------------------------------------//

  const infoLine = document.querySelector('.info')
  infoLine.textContent = "No learner is selected"

  
card.addEventListener('click', evt => {
  // is the clicked card already selected? 
  if(card.classList.contains('selected')){
    card.classList.remove('selected')
    document.querySelector('.info').textContent = "No learner is selected"
  } else {
    document.querySelectorAll('.card').forEach(card => {
      card.classList.remove('selected')
      document.querySelector('.info').textContent = "No learner is selected"
    })
    card.classList.add('selected')
    document.querySelector('.info').textContent = `The selected learner is ${learner.fullName}`
  }
})
  return card 
}
//-------------------------------------------------------------//

try {
  const learnersData = await axios.get('http://localhost:3003/api/learners')
  const mentorsData = await axios.get('http://localhost:3003/api/mentors')
  const learners = learnersData.data
  const mentors = mentorsData.data
  // console.log(learners)
  // console.log(mentors)
  learners.forEach((learner, idx) => {
    console.log(learner.fullName, idx)
    const learnerCard = buildLearnerCard(learner, mentors)
    document.querySelector('.cards').appendChild(learnerCard)
  })

} catch (error) {
  console.log(error.message)
}
//------------------------------------------------------------//
const myFooter = document.querySelector('footer')
myFooter.textContent = "© BLOOM INSTITUTE OF TECHNOLOGY 2023"



//   // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
