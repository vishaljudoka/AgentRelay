export type JobStatus = 'pending' | 'completed' | 'failed';

export interface AnalysisResult {
    summary: string;
    key_insights: string[];
    social_posts: {
        platform: string;
        content: string;
    }[];
    sources_processed: {
        url: string;
        title: string;
    }[];
}

export interface InputConfig {
    seedUrls: string[];
    maxItems: number;
}

export interface Job {
    id: string;
    user_id: string;
    topic: string;
    input_config?: InputConfig;
    status: JobStatus;
    output: {
        results: AnalysisResult; // Changed from array to single object per new schema in agent.md
    } | null;
    created_at: string;
}

export interface Profile {
    id: string;
    email: string;
    created_at: string;
}
