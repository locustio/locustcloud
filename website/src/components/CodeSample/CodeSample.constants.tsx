export const SIMPLE = `from locust import HttpUser, task

class QuickstartUser(HttpUser):
    @task
    def hello_world(self):
        self.client.get("/hello")
        self.client.get("/world")

        for i in range(10):
            self.client.get(f"/item/{i}")`;

export const LOOPS = `from locust import FastHttpUser, run_single_user, task

class MyUser(FastHttpUser):
    host = "https://echo-server.example.com"

    @task
    def t(self):
        with self.rest("GET", "/get", json={"foo": 1}) as resp:
            if resp.js["foo"] != 1:
                resp.failure(f"Unexpected value of foo in response {resp.text}")`;

export const LIBS = `from locust import HttpUser, SequentialTaskSet, between, task

import random

from pyquery import PyQuery


class BrowseDocumentationSequence(SequentialTaskSet):
    def on_start(self):
        self.urls_on_current_page = self.toc_urls = None

    # assume all users arrive at the index page
    @task
    def index_page(self):
        r = self.client.get("/")
        pq = PyQuery(r.content)
        link_elements = pq(".toctree-wrapper a.internal")
        self.toc_urls = [l.attrib["href"] for l in link_elements]
        # it is fine to do multiple requests in a single task, you dont need SequentialTaskSet for that
        self.client.get("/favicon.ico")

    @task
    def load_page(self, url=None):
        url = random.choice(self.toc_urls)
        r = self.client.get(url)
        pq = PyQuery(r.content)
        link_elements = pq("a.internal")
        self.urls_on_current_page = [l.attrib["href"] for l in link_elements]

    @task
    def load_sub_page(self):
        url = random.choice(self.urls_on_current_page)
        r = self.client.get(url)


class AwesomeUser(HttpUser):
    tasks = [BrowseDocumentationSequence]
    host = "https://docs.locust.io/en/latest/"

    # we assume someone who is browsing the Locust docs,
    # generally has a quite long waiting time (between
    # 20 and 600 seconds), since there's a bunch of text
    # on each page
    wait_time = between(20, 600)`;

export const ANY_SERVICE = `from locust import task
from locust.contrib.postgres import PostgresUser
import random

class MyUser(PostgresUser):
    @task
    def run_select_query(self):
        self.client.execute_query(
            "SELECT * FROM loadtesting.invoice WHERE amount > 500",
        )

    @task
    def run_update_query(self):
        random_amount = random.randint(1, 12)
        self.client.execute_query(
            f"UPDATE loadtesting.invoice SET amount={random_amount} WHERE amount < 10",
        )`;

export const AI = `from locust import task
from locust.contrib.oai import OpenAIUser

class MyUser(OpenAIUser):
    @task
    def t(self):
        response = self.client.responses.create(
            model="gpt-5",
            instructions="You are a coding assistant that speaks like it were a Monty Python skit.",
            input="How do I check if a Python object is an instance of a class?",
        )`;

export const OTEL = `$ export OTEL_TRACES_EXPORTER=otlp
$ export OTEL_EXPORTER_OTLP_ENDPOINT=https://...
$ export OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf
$ locust --otel
[2025-11-28 16:27:01,916] locust/INFO/locust.main: Starting Locust, OpenTelemetry enabled
[2025-11-28 16:27:01,916] locust/INFO/locust.main: Starting web interface at http://0.0.0.0:8089, press enter to open your default browser.
...`;
