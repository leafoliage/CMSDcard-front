import Layout from '../../component/layout'
import Post from '../../component/article/post'
import Loading from '../../component/loading'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function New() {
    const router = useRouter()
    const [data, setData] = useState()

    useEffect(() => {
        async function fetchData() {
            const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/select/new`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth')}`
                }
            })
            if (data.status == 401 || data.status == 403) {
                router.push('/user/login')
                router.reload()
            }
            else if (!data.ok) window.alert('Sorry!  Σ(･口･)   ' + await res.text())
            else setData(await data.json())
        }
        setInterval(fetchData, 1000)
    }, [])

    return (
        <Layout>
            <div className="py-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-5 mt-3">最新文章</h1>
                        </div>
                    </div>
                </div>
            </div>

            <main>
                {data ?
                    data.map(post => (
                        <Post post={post} key={post._id} />
                    )) : (
                        <Loading />
                    )
                }
            </main>
        </Layout>
    )
}