import {Fragment, useContext, useEffect} from 'react'
import {GithubContext} from '../context/github/githubContext'
import {Link, useParams} from 'react-router-dom'
import {Repos} from '../components/Repos'

export const Profile = () => {
  const {getUser, getRepos, loading, user, repos} = useContext(GithubContext)
  const params = useParams()
  const urlName = params.name

  useEffect(() => {
    console.log('Твой urlName: ', urlName)
    getUser(urlName)
    getRepos(urlName)
  }, [])

  if (loading) {
    return <p className="text-center">Загрузка...</p>
  }

  const {
    name, company, avatar_url, location,
    bio, blog, login, html_url,
    followers, following, public_repos,
    public_gists
  } = user

  const Badge = {
    margin: '2px',
    height: '25px'
  }

  return (
    <Fragment>
      <Link to="/" className="btn btn-link">На главную</Link>

      <div className="card mb-3">
        <div className="card-body">
          <div className="row">

            <div className="col">
              <img src={avatar_url} alt={name} style={{width: '150px'}}/>
              <h3 className="mt-3">{name}</h3>
              {location && <p>Город: <strong>{location}</strong></p>}
            </div>

            <div className="col mb-3">
              <div>
                {
                  bio && <Fragment>
                    <h3>BIO</h3>
                    <p>{bio}</p>
                  </Fragment>
                }
                <ul>
                  {login && <li>
                    <strong>Username: </strong> {login}
                  </li>}
                  {login && <li>
                    <strong>Компания: </strong> {company || 'Нет информации'}
                  </li>}
                  {login && <li>
                    <strong>Сайт: </strong> {blog || 'Нет информации'}
                  </li>}
                </ul>
              </div>

              <div>
                <div style={Badge} className="badge bg-primary">Подписчики: {followers}</div>
                <div style={Badge} className="badge bg-success">Подписан: {following}</div>
                <div style={Badge} className="badge bg-warning">Репозитории: {public_repos}</div>
                <div style={Badge} className="badge bg-info">Gists: {public_gists}</div>
              </div>



              <a href={html_url} style={{width: '100%'}} className="btn btn-dark mt-4" target="_blank" rel="noopener noreferrer">Открыть профиль</a>

            </div>
          </div>
        </div>
      </div>
      <Repos repos={repos}/>
    </Fragment>
  )
}
