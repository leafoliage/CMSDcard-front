import Layout from '../../component/layout'
import Post from '../../component/article/post'
import Loading from '../../component/loading'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Hot() {
    const router = useRouter()
    const [data, setData] = useState()

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/select/hot`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('auth')}`
                    }
                })

                if (data.status == 401 || data.status == 403) {
                    router.push('/user/login')
                    router.reload()
                }
                else if (!data.ok) window.alert('Sorry!  Σ(･口･)   ' + await res.text())
                else {
                    setData(await data.json())
                }
            } catch (err) {
                // window.alert("系統錯誤")
                console.log(err)
            }
        }

        fetchData()
    }, [])

    return (
        <Layout>
            <div className="py-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-5 mt-3">熱門文章</h1>
                        </div>
                    </div>
                </div>
            </div>

            <main>
                {data ?
                    (
                        Array.from(data).length === 0 ? (
                            <div className="py-5 mt-5" >
                                <div className="container">
                                    <div className="row justify-content-center">
                                        <div className="col-md-4">
                                            <div className="text-center">
                                                <h6>最近沒有熱門文章 :P</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : data.map(post => (
                            <Post post={post} key={post._id} />
                        ))
                    ) : (
                        <Loading />
                    )
                }
            </main>
        </Layout>
    )
}